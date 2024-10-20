import React, { useState, useEffect } from 'react';
import { callSubmitRating, callFetchRatings, callSubmitAdminResponse } from '../../services/api'; // Import hàm gọi API
import './RatingForm.css'; // Thêm CSS để làm đẹp cho form

const RatingForm = ({ productId }) => {
    const [content, setContent] = useState('');
    const [numberStars, setNumberStars] = useState(1);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [ratings, setRatings] = useState([]); // Trạng thái để lưu danh sách đánh giá
    const [adminResponse, setAdminResponse] = useState('');
    const [selectedRatingId, setSelectedRatingId] = useState(null);

    // Hàm lấy danh sách đánh giá từ API
    const fetchRatings = async () => {
        try {
            const response = await callFetchRatings(productId);
            console.log(response.data); // Kiểm tra dữ liệu từ API

            // Cập nhật danh sách đánh giá và đảm bảo có trường userName
            const updatedRatings = response.data.map(rating => ({
                ...rating,
                userName: rating.userName || 'Người dùng ẩn danh' // Gán giá trị mặc định nếu không có tên
            }));
            setRatings(updatedRatings); // Cập nhật danh sách đánh giá
        } catch (err) {
            console.error('Lỗi khi lấy danh sách đánh giá:', err);
        }
    };

    useEffect(() => {
        fetchRatings(); // Gọi hàm lấy danh sách đánh giá khi component được mount
    }, [productId]); // Gọi lại khi productId thay đổi

    const handleStarClick = (stars) => {
        setNumberStars(stars);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const rating = {
                content,
                numberStars,
            };

            // Gửi yêu cầu POST đến API để thêm đánh giá
            await callSubmitRating(productId, rating);
            setSuccess('Đánh giá của bạn đã được gửi thành công!');
            setContent('');
            setNumberStars(1);
            setError(null);

            // Lấy lại danh sách đánh giá sau khi gửi thành công
            fetchRatings();
        } catch (err) {
            setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
            setSuccess(null);
        }
    };

    const handleAdminResponseSubmit = async (ratingId) => {
        try {
            // Gửi phản hồi từ admin đến server
            await callSubmitAdminResponse(ratingId, adminResponse);
            setAdminResponse(''); // Reset nội dung phản hồi
            setSelectedRatingId(null); // Reset ID đã chọn
            fetchRatings(); // Lấy lại danh sách đánh giá
        } catch (err) {
            console.error('Lỗi khi gửi phản hồi:', err);
            setError('Đã có lỗi xảy ra khi gửi phản hồi.'); // Cập nhật thông báo lỗi
        }
    };

    // Hàm đếm số lượng đánh giá cho từng mức sao
    const countRatingsByStars = () => {
        const counts = [0, 0, 0, 0, 0]; // Mảng để lưu số lượng đánh giá từ 1 đến 5 sao
        ratings.forEach(rating => {
            counts[rating.numberStars - 1]++;
        });
        return counts;
    };

    const starCounts = countRatingsByStars();

    return (
        <div className="rating-form">
            <h2>Khách hàng nói về sản phẩm</h2>

            {/* Hiển thị thanh tiến độ cho từng mức sao */}
            <div className="average-rating">
                {starCounts.map((count, index) => (
                    <div key={index} className="progress-bar-wrapper">
                        <div className="star-label">{index + 1} ★</div>
                        <div className="progress-bar">
                            <div
                                className="progress"
                                style={{ width: `${(count / ratings.length) * 100 || 0}%`, backgroundColor: '#e74c3c' }}
                            />
                        </div>
                        <div className="count-label">{count} </div>
                    </div>
                ))}
            </div>

            <h2>Bình luận</h2>
            <form onSubmit={handleSubmit}>
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${numberStars >= star ? 'filled' : ''}`}
                            onClick={() => handleStarClick(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <div>
                    <label htmlFor="content">Nội dung đánh giá:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                    />
                </div>
                <button type="submit">Gửi đánh giá</button>
            </form>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            {/* Hiển thị danh sách đánh giá */}
            <div className="ratings-list">
                {ratings.length === 0 ? (
                    <p>Chưa có đánh giá nào.</p>
                ) : (
                    ratings.map((rating) => (
                        <div key={rating.id} className="rating-item">
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} className={`star ${rating.numberStars >= star ? 'filled' : ''}`}>
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p><strong>{rating.userName}</strong>: {rating.content}</p> {/* Hiển thị tên người dùng */}

                            {/* Hiển thị phản hồi của admin nếu có */}
                            {rating.adminResponse && (
                                <div className="admin-response">
                                    <strong>Phản hồi từ admin:</strong> {rating.adminResponse}
                                </div>
                            )}

                            {/* Khung bình luận trả lời cho admin */}
                            <div className="admin-reply">
                                {selectedRatingId === rating.id ? (
                                    <>
                                        <textarea
                                            value={adminResponse}
                                            onChange={(e) => setAdminResponse(e.target.value)}
                                            placeholder="Nhập phản hồi của bạn..."
                                        />
                                        <button onClick={() => handleAdminResponseSubmit(rating.id)}>Gửi phản hồi</button>
                                    </>
                                ) : (
                                    <button className="reply-button" onClick={() => { setSelectedRatingId(rating.id); setAdminResponse(''); }}>
                                        <span className="arrow">➤</span> {/* Biểu tượng mũi tên */}
                                        Trả lời
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RatingForm;
