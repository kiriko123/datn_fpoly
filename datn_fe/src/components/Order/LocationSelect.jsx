import { useEffect, useState } from "react";
import axios from "axios";
import { Select, Input } from "antd";

const { Option } = Select;

const LocationSelect = ({ onAddressChange }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [street, setStreet] = useState("");

    const [selectedProvince, setSelectedProvince] = useState(undefined);
    const [selectedDistrict, setSelectedDistrict] = useState(undefined);
    const [selectedWard, setSelectedWard] = useState(undefined);

    useEffect(() => {
        axios.get("https://vapi.vnappmob.com/api/province/")
            .then((response) => {
                setProvinces(response.data.results);
            });
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedProvince}`)
                .then((response) => {
                    setDistricts(response.data.results);
                    setWards([]); // Clear wards when province changes
                });
        } else {
            setDistricts([]);
            setWards([]);
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`)
                .then((response) => {
                    setWards(response.data.results);
                });
        } else {
            setWards([]);
        }
    }, [selectedDistrict]);

    const handleProvinceChange = (value) => {
        setSelectedProvince(value);
        setSelectedDistrict(undefined);
        setSelectedWard(undefined);
        onAddressChange(value, null, null, street); // Update parent on address change
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
        setSelectedWard(undefined);
        onAddressChange(selectedProvince, value, null, street); // Update parent on address change
    };

    const handleWardChange = (value) => {
        setSelectedWard(value);
        onAddressChange(selectedProvince, selectedDistrict, value, street); // Update parent on address change
    };

    const handleStreetChange = (e) => {
        setStreet(e.target.value);
        onAddressChange(selectedProvince, selectedDistrict, selectedWard, e.target.value); // Update parent on address change
    };

    return (
        <div style={{ marginBottom: "10px" }}>
            <Select
                placeholder="Chọn Tỉnh"
                value={selectedProvince}
                onChange={handleProvinceChange}
                style={{ width: '100%', marginBottom: '10px' }}
            >
                {provinces.map((province) => (
                    <Option key={province.province_id} value={province.province_id}>
                        {province.province_name}
                    </Option>
                ))}
            </Select>

            <Select
                placeholder="Chọn Huyện"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedProvince}
                style={{ width: '100%', marginBottom: '10px' }}
            >
                {districts.map((district) => (
                    <Option key={district.district_id} value={district.district_id}>
                        {district.district_name}
                    </Option>
                ))}
            </Select>

            <Select
                placeholder="Chọn Xã"
                value={selectedWard}
                onChange={handleWardChange}
                disabled={!selectedDistrict}
                style={{ width: '100%', marginBottom: '10px' }}
            >
                {wards.map((ward) => (
                    <Option key={ward.ward_id} value={ward.ward_id}>
                        {ward.ward_name}
                    </Option>
                ))}
            </Select>

            <Input
                placeholder="Nhập số nhà, tên đường"
                value={street}
                onChange={handleStreetChange}
                disabled={!selectedWard}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default LocationSelect;
