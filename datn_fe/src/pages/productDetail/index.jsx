import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
// import ViewDetail from "../../components/Book/ViewDetail";
import {callFetchProductById} from "../../services/api";
import ViewDetail from "../../components/ProductDetail/ViewDetail.jsx";

const ProductDetailPage = () => {
    const [dataProduct, setDataProduct] = useState()
    let location = useLocation();

    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // book id

    useEffect(() => {
        fetchProduct(id);
    }, [id]);

    const fetchProduct = async (id) => {
        const res = await callFetchProductById(id);
        if (res && res.data) {
            let raw = res.data;
            //process data
            raw.items = getImages(raw);

            setTimeout(() => {
                setDataProduct(raw);
            }, 500)

        }
    }

    const getImages = (raw) => {
        const images = [];
        if (raw.thumbnail) {
            images.push(
                {
                    original: `${import.meta.env.VITE_BACKEND_URL}/storage/product/${raw.thumbnail}`,
                    thumbnail: `${import.meta.env.VITE_BACKEND_URL}/storage/product/${raw.thumbnail}`,
                    originalClass: "original-image",
                    thumbnailClass: "thumbnail-image"
                },
            )
        }
        if (raw.images) {
            raw.images?.map(item => {
                images.push(
                    {
                        original: `${import.meta.env.VITE_BACKEND_URL}/storage/product/${item}`,
                        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/storage/product/${item}`,
                        originalClass: "original-image",
                        thumbnailClass: "thumbnail-image"
                    },
                )
            })
        }
        return images;
    }
    return (
        <>
            <ViewDetail dataProduct={dataProduct}/>
        </>
    )
}

export default ProductDetailPage;
