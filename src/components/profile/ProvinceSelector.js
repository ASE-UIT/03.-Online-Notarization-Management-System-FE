import React, { useState, useEffect } from 'react';
import LabeledTextField from '../modals/LabeledTextField';
import { Box } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode } from 'vn-provinces';

const ProvinceSelector = ({ city, district, ward, onCityChange, onDistrictChange, onWardChange }) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [inputCity, setInputCity] = useState(city || '');
  const [inputDistrict, setInputDistrict] = useState(district || '');
  const [inputWard, setInputWard] = useState(ward || '');

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
  }, [inputCity, cities]);

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
    }
  }, [inputDistrict, districts]);

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
        onChange={handleCityChange}
        isAutoComplete={true}
        options={cities}
      />
      <LabeledTextField
        label="Quận/Huyện"
        value={city ? inputDistrict : ''}
        onChange={handleDistrictChange}
        isAutoComplete={true}
        options={districts}
        disabled={!city}
      />
      <LabeledTextField
        label="Xã/Phường/Thị trấn"
        value={district && city ? inputWard : ''}
        onChange={handleWardChange}
        isAutoComplete={true}
        options={wards}
        disabled={!(district && city)}
      />
    </Box>
  );
};

export default ProvinceSelector;
