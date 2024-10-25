import React, { useEffect, useState } from 'react';
import { Box, Divider, Drawer, IconButton, List, Typography } from '@mui/material';
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Logout } from '@mui/icons-material';
import { dark, primary, white, red } from '../config/theme/themePrimitives';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { userLogout } from '../stores/actions/authAction';
import YesNoModal from './modals/YesNoModal';
import { sidebarItems } from '../utils/fakeData';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
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
  const { userInfo } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);


  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(userLogout()).unwrap();
      if (resultAction) navigate('/signin');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleSelectMenu = (menu) => {
    switch (menu.type) {
      case MENUS.LOGOUT:
        setOpenLogoutModal(true);
        break;

      default:
        setSelectedMenu(menu.type);
        navigate(menu.href);
        break;
    }
  };

  useEffect(() => {
    const currentMenu = sidebarItems.find((item) => item.href === location.pathname);
    if (currentMenu) {
      setSelectedMenu(currentMenu.type);
    }
  }, [location, userInfo]);

  const drawerWidth = openSideBar ? '18rem' : '5rem';
  const drawerTransition = '0.2s ease';

  return (
    <Drawer
      variant="permanent"
      open={openSideBar}
      anchor="left"
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
            onClick={() => setOpenSideBar(!openSideBar)}
            sx={{ color: dark[500], fontSize: 20, '&:hover': { backgroundColor: primary[500], color: white[50] } }}
          >
            {openSideBar ? <KeyboardDoubleArrowLeft fontSize="inherit" /> : <KeyboardDoubleArrowRight fontSize="inherit" />}
          </IconButton>
        </Box>

        <Box flex={1}>
          <List>
            {sidebarItems.map((screen, index) => (
              <SidebarItem
                key={index}
                type={screen.type}
                icon={screen.icon}
                title={screen.title}
                selectedMenu={selectedMenu}
                openSideBar={openSideBar}
                onClick={() => handleSelectMenu(screen)}
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
            icon={<AccountCircleRoundedIcon />}
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
