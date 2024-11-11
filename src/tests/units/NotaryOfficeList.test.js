import { render, screen, fireEvent } from '@testing-library/react';
import NotaryOfficeList from '../../../pages/services/NotaryOfficeList';
import '@testing-library/jest-dom';
import NotaryOfficeService from '../../../services/notaryOffice.service';
import { BrowserRouter } from 'react-router-dom';

// Mock API
jest.mock('../../../services/notaryOffice.service');

const mockOffices = [
  {
    id: 1,
    name: 'Văn phòng công chứng A',
    description: 'Mô tả văn phòng A',
    logo: 'logoA.png',
    location: {
      city: 'Hà Nội',
      district: 'Quận Ba Đình',
      address: 'Số 1, Phố A'
    }
  },
  {
    id: 2,
    name: 'Văn phòng công chứng B',
    description: 'Mô tả văn phòng B',
    logo: 'logoB.png',
    location: {
      city: 'Hà Nội',
      district: 'Quận Hoàn Kiếm',
      address: 'Số 2, Phố B'
    }
  }
];

describe('Danh sách Văn phòng công chứng', () => {
  beforeEach(() => {
    NotaryOfficeService.getOffices.mockResolvedValue({ data: mockOffices });
  });

  test('Người dùng có thể chọn Tỉnh/Thành phố', async () => {
    render(
      <BrowserRouter>
        <NotaryOfficeList />
      </BrowserRouter>
    );
    const citySelect = await screen.findByLabelText('Tỉnh/Thành phố');
    fireEvent.mouseDown(citySelect);
    const cityOption = await screen.findByText('Hà Nội');
    fireEvent.click(cityOption);
    expect(citySelect.textContent).toBe('Hà Nội');
  });

  test('Người dùng có thể chọn Quận/Huyện', async () => {
    render(
      <BrowserRouter>
        <NotaryOfficeList />
      </BrowserRouter>
    );
    const districtSelect = await screen.findByLabelText('Quận/Huyện');
    fireEvent.mouseDown(districtSelect);
    const districtOption = await screen.findByText('Quận Ba Đình');
    fireEvent.click(districtOption);
    expect(districtSelect.textContent).toBe('Quận Ba Đình');
  });

  test('Người dùng có thể tìm kiếm theo tên', async () => {
    render(
      <BrowserRouter>
        <NotaryOfficeList />
      </BrowserRouter>
    );
    const searchInput = await screen.findByPlaceholderText('Tìm kiếm theo tên...');
    fireEvent.change(searchInput, { target: { value: 'Văn phòng công chứng A' } });
    expect(searchInput.value).toBe('Văn phòng công chứng A');

    const officeName = await screen.findByText('Văn phòng công chứng A');
    expect(officeName).toBeInTheDocument();

    const hiddenOfficeName = screen.queryByText('Văn phòng công chứng B');
    expect(hiddenOfficeName).not.toBeInTheDocument();
  });

  test('Bản đồ hiển thị đúng các văn phòng công chứng', async () => {
    render(
      <BrowserRouter>
        <NotaryOfficeList />
      </BrowserRouter>
    );
    const mapMarkers = await screen.findAllByTestId('map-marker');
    expect(mapMarkers.length).toBe(mockOffices.length);
  });

  test('Danh sách các văn phòng công chứng hiển thị đầy đủ thông tin', async () => {
    render(
      <BrowserRouter>
        <NotaryOfficeList />
      </BrowserRouter>
    );
    const officeItems = await screen.findAllByTestId('office-item');
    expect(officeItems.length).toBe(mockOffices.length);

    officeItems.forEach((item, index) => {
      expect(item.querySelector('.office-name').textContent).toBe(mockOffices[index].name);
      expect(item.querySelector('.office-description').textContent).toBe(mockOffices[index].description);
      expect(item.querySelector('.office-logo')).toBeInTheDocument();
    });
  });

  test('Chức năng phân trang hoạt động chính xác', async () => {
    // Giả sử mỗi trang hiển thị 1 văn phòng
    NotaryOfficeService.getOffices.mockResolvedValue({ data: [mockOffices[0]] });

    render(
      <BrowserRouter>
        <NotaryOfficeList />
      </BrowserRouter>
    );

    const officeItems = await screen.findAllByTestId('office-item');
    expect(officeItems.length).toBe(1);

    const nextPageButton = screen.getByLabelText('Trang tiếp theo');
    fireEvent.click(nextPageButton);

    NotaryOfficeService.getOffices.mockResolvedValue({ data: [mockOffices[1]] });

    const newOfficeItems = await screen.findAllByTestId('office-item');
    expect(newOfficeItems.length).toBe(1);
    expect(newOfficeItems[0].querySelector('.office-name').textContent).toBe(mockOffices[1].name);
  });
});
