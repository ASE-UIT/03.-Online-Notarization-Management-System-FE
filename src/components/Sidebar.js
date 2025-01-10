import React, { useCallback, useEffect, useState } from 'react';
import { Box, Divider, Drawer, IconButton, List, Typography } from '@mui/material';
import { Article, HistoryEdu, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Logout, Wallet } from '@mui/icons-material';
import { dark, primary, white, red } from '../config/theme/themePrimitives';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { userLogout } from '../stores/actions/authAction';
import YesNoModal from './modals/YesNoModal';
import {
  AddCircleOutline,
  DocumentScanner,
  Groups2Rounded,
  GridViewRounded,
  SupervisorAccountRounded,
  AccountCircleRounded,
  HailRounded,
  WorkHistoryRounded,
} from '@mui/icons-material';
import SidebarItem from './static/SidebarItem';
const MENUS = {
  LOGOUT: 'logout',
  PROFILE: 'profile',
  CREATE_NOTARY_SESSION: 'create-notary-session',
};

const Sidebar = () => {
  const [openSideBar, setOpenSideBar] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const role = user?.role;

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(userLogout()).unwrap();
      if (resultAction) navigate('/signin');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleSelectMenu = (menu) => {
    if (menu.type === MENUS.LOGOUT) {
      setOpenLogoutModal(true);
    } else {
      setSelectedMenu(menu.type);
      navigate(menu.href);
    }
  };

  const renderSidebarItems = useCallback(() => {
    const items = [];

    if (role === 'user') {
      items.push(
        {
          type: 'create-notarization-profile',
          icon: <AddCircleOutline />,
          title: 'Tạo hồ sơ công chứng',
          href: '/user/create-notarization-profile',
        },
        { type: 'history', icon: <DocumentScanner />, title: 'Lịch sử', href: '/user/history' },
        {
          type: 'create-notarization-session',
          icon: <Groups2Rounded />,
          title: 'Phiên công chứng',
          href: '/user/notarization-session',
        },
        {
          type: 'document-wallet',
          icon: <Wallet />,
          title: 'Ví tài liệu',
          href: '/user/document-wallet',
        },
      );
    } else if (role === 'admin') {
      items.push(
        {
          type: 'dashboard',
          icon: <GridViewRounded />,
          title: 'Dashboard',
          href: '/admin/dashboard',
        },
        {
          type: 'employee-management',
          icon: <HailRounded />,
          title: 'Quản lý nhân viên',
          href: '/admin/employee-management',
        },
        {
          type: 'user-management',
          icon: <SupervisorAccountRounded />,
          title: 'Quản lý người dùng',
          href: '/admin/user-management',
        },
        {
          type: 'notary-management',
          icon: <WorkHistoryRounded />,
          title: 'Quản lý công chứng',
          href: '/admin/notary-management',
        },
      );
    } else if (role === 'secretary') {
    } else if (role === 'notary') {
      items.push(
        {
          type: 'dashboard',
          icon: <GridViewRounded />,
          title: 'Dashboard',
          href: '/notary/dashboard',
        },
        {
          type: 'pending-notarization-documents',
          icon: <Article />,
          title: 'Tài liệu chờ xác nhận',
          href: '/notary/pending-notarization-documents',
        },
        {
          type: 'awaiting-signature-documents',
          icon: <HistoryEdu />,
          title: 'Tài liệu chờ ký số',
          href: '/notary/awaiting-signature-documents',
        },
        {
          type: 'notary-session-management',
          icon: <Groups2Rounded />,
          title: 'Quản lý phiên',
          href: '/notary/notary-session-management',
        },
        {
          type: 'notarization-history',
          icon: <DocumentScanner />,
          title: 'Lịch sử công chứng',
          href: '/notary/notarization-history',
        },
      );
    }
    return items;
  }, [role]);

  useEffect(() => {
    const currentMenu = renderSidebarItems().find((item) => item.href === location.pathname);
    if (currentMenu) {
      setSelectedMenu(currentMenu.type);
    }
  }, [location, renderSidebarItems]);

  const drawerWidth = openSideBar ? '18rem' : '5rem';
  const drawerTransition = '0.2s ease';

  return (
    <Drawer
      variant="permanent"
      open={openSideBar}
      anchor="left"
      data-testid="sidebar-container"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: drawerTransition,
          overflow: 'hidden',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', p: 2, backgroundColor: white[50] }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: openSideBar ? 'flex-start' : 'center' }}>
          {openSideBar && (
            <Typography variant="h6" sx={{ flexGrow: 1, ml: 2, color: dark[700] }}>
              .ASE
            </Typography>
          )}
          <IconButton
            data-testid="sidebar-toggle"
            onClick={() => setOpenSideBar(!openSideBar)}
            sx={{ color: dark[500], fontSize: 20, '&:hover': { backgroundColor: primary[500], color: white[50] } }}
          >
            {openSideBar ? <KeyboardDoubleArrowLeft fontSize="inherit" /> : <KeyboardDoubleArrowRight fontSize="inherit" />}
          </IconButton>
        </Box>

        <Box flex={1}>
          <List>
            {renderSidebarItems().map((item) => (
              <SidebarItem
                key={item.type}
                type={item.type}
                icon={item.icon}
                title={item.title}
                selectedMenu={selectedMenu}
                openSideBar={openSideBar}
                onClick={() => handleSelectMenu(item)}
              />
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        <List>
          <SidebarItem
            icon={<Logout />}
            type={MENUS.LOGOUT}
            title={'Đăng xuất'}
            selectedMenu={selectedMenu}
            openSideBar={openSideBar}
            onClick={() => setOpenLogoutModal(true)}
            textColor={selectedMenu === MENUS.LOGOUT ? primary[500] : red[500]}
          />

          <SidebarItem
            icon={<AccountCircleRounded />}
            type={MENUS.PROFILE}
            title={user?.name || 'Stranger'}
            selectedMenu={selectedMenu}
            openSideBar={openSideBar}
            onClick={() => handleSelectMenu({ type: MENUS.PROFILE, href: '/profile' })}
          />
        </List>

        <YesNoModal
          title="Đăng xuất"
          content="Bạn có chắc chắn muốn đăng xuất?"
          open={openLogoutModal}
          setOpen={setOpenLogoutModal}
          onYes={handleLogout}
          onNo={() => setOpenLogoutModal(false)}
        />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
