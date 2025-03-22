"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { Badge, Card, CardContent, Divider } from "@mui/material";
import Link from "next/link";
import { useAuthStore } from "../../auth/store/auth";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const pages = [
  { name: "Companies", link: "/register/company" },
  { name: "Brokers", link: "/register/broker" },
  { name: "About Us", link: "/aboutUs" },
  { name: "FAQ", link: "/faq" },
];

const pagesLogin = [
  { name: "Home", link: "/" },
  { name: "Cars", link: "/cars" },
  { name: "About Us", link: "/aboutUs" },
  { name: "FAQ", link: "/faq" },
];
const settings = ["Profile", "Logout"];

const Header = () => {
  const [anchorElNotifications, setAnchorElNotifications] =
    React.useState<null | HTMLElement>(null);
  const { logout, isAuthenticated: IsLogin, user } = useAuthStore();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const { data: notifications, error } = useSWR<Notification[]>(
    IsLogin ? "notifications" : null,
    (url: any) => HttpClient.getInstance().fetcher(url)
  );

  const handleOpenNotificationsMenu = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (setting: string) => {
    handleCloseUserMenu();

    switch (setting) {
      case "Profile":
        if (user?.role === "admin") router.push("/dashboard/admin");
        if (user?.role === "broker") router.push("/dashboard/broker/profile");
        if (user?.role === "company") router.push("/dashboard/company/profile");
        break;
      case "Logout":
        handleLogout(); 
        break;
      default:
        break;
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: "0px 9px 11px 0px rgba(67, 88, 130, 0.5)",
          borderBottom: "1px solid #fff",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <div className="flex gap-3 items-center mr-8">
              <Link href="/">
                <img src="/rentryx-9.svg" alt="LOGO" className="h-[52px]" />
              </Link>
            </div>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {IsLogin
                  ? pagesLogin.map((page, i) => (
                      <MenuItem key={i} onClick={handleCloseNavMenu}>
                        <Link href={page.link} passHref>
                          <Typography
                            sx={{ textAlign: "center", color: "#151413" }}
                          >
                            {page.name}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ))
                  : pages.map((page, i) => (
                      <MenuItem key={i} onClick={handleCloseNavMenu}>
                        <Link href={page.link} passHref>
                          <Typography
                            sx={{ textAlign: "center", color: "#151413" }}
                          >
                            {page.name}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {IsLogin
                ? pagesLogin.map((page, i) => (
                    <MenuItem key={i} onClick={handleCloseNavMenu}>
                      <Link href={page.link} passHref>
                        <Typography
                          sx={{ textAlign: "center", color: "#151413" }}
                        >
                          {page.name}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))
                : pages.map((page, i) => (
                    <Link href={page.link} passHref key={i}>
                      <Button
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "#151413", display: "block" }}
                      >
                        {page.name}
                      </Button>
                    </Link>
                  ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {IsLogin ? (
                <>
                  <div className="flex gap-8">
                    <IconButton
                      sx={{ p: 0 }}
                      onClick={handleOpenNotificationsMenu}
                    >
                      <Badge
                        badgeContent={
                          notifications?.filter((n) => !n.read).length || 0
                        }
                        color="error"
                      >
                        <svg
                          width="22"
                          height="25"
                          viewBox="0 0 22 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xlinkHref="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            width="21.4286"
                            height="25"
                            fill="url(#pattern0_3248_28600)"
                          />
                          <defs>
                            <pattern
                              id="pattern0_3248_28600"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlinkHref="#image0_3248_28600"
                                transform="matrix(0.00253906 0 0 0.00217634 -0.15 -0.0571429)"
                              />
                            </pattern>
                            <image
                              id="image0_3248_28600"
                              width="512"
                              height="512"
                              preserveAspectRatio="none"
                              xlinkHref="data:image/png;base64,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"
                            />
                          </defs>
                          <script />
                        </svg>
                      </Badge>
                    </IconButton>
                    <Menu
                      id="notifications-menu"
                      anchorEl={anchorElNotifications}
                      open={Boolean(anchorElNotifications)}
                      onClose={handleCloseNotificationsMenu}
                      sx={{ mt: "45px" }}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <Card sx={{ minWidth: 300, maxWidth: 345 }}>
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Notifications
                          </Typography>
                          <Divider sx={{ my: 1 }} />
                          {error && (
                            <Typography color="error">
                              Failed to load notifications
                            </Typography>
                          )}
                          {!notifications && !error && (
                            <Typography>Loading...</Typography>
                          )}
                          {notifications?.length === 0 && (
                            <Typography>No notifications</Typography>
                          )}
                          {notifications?.map((notification) => (
                            <div key={notification.id} className="mb-2">
                              <Typography variant="subtitle2" gutterBottom>
                                {notification.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {notification.message}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {new Date(
                                  notification.createdAt
                                ).toLocaleString()}
                              </Typography>
                              <Divider sx={{ mt: 1 }} />
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </Menu>
                    <Tooltip title="Open Menu">
                      <div className="flex items-center gap-3">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <svg
                            width="26"
                            height="25"
                            viewBox="0 0 26 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.2182 11.5385C18.2182 12.5844 17.908 13.6069 17.3269 14.4766C16.7458 15.3463 15.9198 16.0241 14.9535 16.4244C13.9872 16.8246 12.9238 16.9294 11.898 16.7253C10.8721 16.5212 9.92979 16.0176 9.19018 15.278C8.45058 14.5384 7.9469 13.596 7.74285 12.5702C7.53879 11.5443 7.64352 10.481 8.04379 9.51465C8.44406 8.54831 9.1219 7.72237 9.99158 7.14126C10.8613 6.56016 11.8837 6.25 12.9297 6.25C14.3318 6.25159 15.676 6.80928 16.6674 7.80071C17.6589 8.79214 18.2166 10.1364 18.2182 11.5385ZM25.4297 12.5C25.4297 14.9723 24.6966 17.389 23.3231 19.4446C21.9495 21.5002 19.9973 23.1024 17.7132 24.0485C15.4292 24.9946 12.9158 25.2421 10.4911 24.7598C8.0663 24.2775 5.83901 23.087 4.09086 21.3388C2.3427 19.5907 1.15219 17.3634 0.669877 14.9386C0.187562 12.5139 0.435104 10.0005 1.3812 7.71645C2.32729 5.43238 3.92945 3.48015 5.98506 2.10663C8.04068 0.733112 10.4574 0 12.9297 0C16.2438 0.00349978 19.4212 1.32158 21.7647 3.66503C24.1081 6.00848 25.4262 9.18587 25.4297 12.5ZM23.5066 12.5C23.5051 11.0764 23.2164 9.66765 22.658 8.35812C22.0995 7.04859 21.2827 5.86513 20.2564 4.87853C19.2301 3.89192 18.0153 3.12242 16.6848 2.61606C15.3542 2.1097 13.9352 1.87686 12.5126 1.93149C6.85157 2.15024 2.33714 6.86538 2.35277 12.53C2.3582 15.1088 3.30929 17.596 5.02585 19.5204C5.72491 18.5065 6.61291 17.6369 7.64123 16.9591C7.7289 16.9012 7.83313 16.8736 7.93797 16.8806C8.04281 16.8875 8.14249 16.9286 8.22176 16.9976C9.52846 18.1278 11.1984 18.7498 12.9261 18.7498C14.6538 18.7498 16.3237 18.1278 17.6304 16.9976C17.7097 16.9286 17.8094 16.8875 17.9142 16.8806C18.019 16.8736 18.1233 16.9012 18.2109 16.9591C19.2406 17.6365 20.1298 18.5062 20.8299 19.5204C22.555 17.589 23.5079 15.0896 23.5066 12.5Z"
                              fill="#151413"
                            />
                          </svg>
                        </IconButton>
                        <span>{user.fullName}</span>
                      </div>
                    </Tooltip>
                  </div>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={() => handleSettingClick(setting)}
                      >
                        <Typography sx={{ textAlign: "center" }}>
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <>
                  <div className="flex">
                    <Link
                      href="/auth/login"
                      className="font-medium text-[#151413] hover:underline"
                    >
                      Login
                    </Link>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ mx: 1, borderColor: "#151413", borderWidth: 1 }}
                    />
                    <Link
                      href="/register/company"
                      className="font-medium text-[#151413] hover:underline"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
