import { Logout } from '@mui/icons-material';
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../redux/apiSlice';
import { logout } from '../redux/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const StyledNavigation = styled('div')`
  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
    font-size: 30px;
  }

  .username {
    margin-left: auto;
  }
`;

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const authState = useAppSelector((root) => root.auth);

  const {data: profile, isLoading, isError} = useGetMyProfileQuery({});

  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {

    if (isError) {
      dispatch(logout());
    }
  }, [isError]);

  return (
    <StyledNavigation className="Navigation">
      <div className="container">
        <Typography variant="h3" className="logo">
          PUB QUIZ
        </Typography>

        {authState.isAuth && (
          <>
            <Typography variant="subtitle2" className="username">
              {authState?.user ? authState.user.name : ''}
            </Typography>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                <img src="./avatars/w3.png" width={'32px'} height={'32px'} />
              </Avatar>
            </IconButton>
          </>
        )}
      </div>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </StyledNavigation>
  );
};

export default Navigation;
