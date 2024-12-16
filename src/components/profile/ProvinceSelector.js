import React, { useState, useEffect } from 'react';
import LabeledTextField from '../modals/LabeledTextField';
import { Box } from '@mui/material';
import { getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode } from 'vn-provinces';

const ProvinceSelector = ({ city, district, ward, onCityChange, onDistrictChange, onWardChange }) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [inputCity, setInputCity] = useState('');
  const [inputDistrict, setInputDistrict] = useState('');
  const [inputWard, setInputWard] = useState('');

  useEffect(() => {
    const fetchCities = () => {
      const provinces = getProvinces().map((province) => ({
        value: province.code,
        label: province.name,
      }));
      setCities(provinces);
    };
    fetchCities();
  }, []);
  
  useEffect(() => {
    setInputCity(city);
  }, [city]);
  
  useEffect(() => {
    setInputDistrict(district);
  }, [district]);
  
  useEffect(() => {
    setInputWard(ward);
  }, [ward]);

  useEffect(() => {
    if (city) {
      const selectedCity = cities.find((c) => c.label === inputCity);
      if (selectedCity) {
        const districtsList = getDistrictsByProvinceCode(selectedCity.value).map((district) => ({
          value: district.code,
          label: district.name,
        }));
        setDistricts(districtsList);
        setWards([]);
      } else {
        setDistricts([]);
        setWards([]);
      }
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [inputCity, cities, city]);

  useEffect(() => {
    if (district) {
      const selectedDistrict = districts.find((d) => d.label === inputDistrict);
      if (selectedDistrict) {
        const wardsList = getWardsByDistrictCode(selectedDistrict.value).map((ward) => ({
          value: ward.code,
          label: ward.name,
        }));
        setWards(wardsList);
      } else {
        setWards([]);
      }
    } else {
      setWards([]);
      setInputWard('');
    }
  }, [inputDistrict, districts, district]);

  const handleCityChange = (value) => {
    setInputCity(value);
    onCityChange(value);
    setDistricts([]);
    setWards([]);
    setInputDistrict('');
    setInputWard('');
  };
  const handleDistrictChange = (value) => {
    setInputDistrict(value);
    onDistrictChange(value);
    setWards([]);
    setInputWard('');
  };
  const handleWardChange = (value) => {
    setInputWard(value);
    onWardChange(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '16px',
        flexDirection: { xs: 'column', sm: 'row' },
        flexWrap: { xs: 'wrap', md: 'nowrap' },
      }}
    >
      <LabeledTextField
        label="Tỉnh/Thành phố"
        value={inputCity || ''}
        defaultValue={city}
        onChange={handleCityChange}
        isAutoComplete={true}
        options={cities}
      />
      <LabeledTextField
        label="Quận/Huyện"
        value={city ? inputDistrict : ''}
        defaultValue={district}
        onChange={handleDistrictChange}
        isAutoComplete={true}
        options={districts}
        disabled={!city}
      />
      <LabeledTextField
        label="Xã/Phường/Thị trấn"
        value={(district && city) ? inputWard : ''}
        defaultValue={ward}
        onChange={handleWardChange}
        isAutoComplete={true}
        options={wards}
        disabled={!(district && city)}
      />
    </Box>
  );
};

export default ProvinceSelector;
