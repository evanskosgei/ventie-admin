import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ALLImages from "../../../common/imagesdata";
import { connect } from "react-redux";
import { ThemeChanger } from "../../../redux/Action";
import store from "../../../redux/store";
import { Closedmenu, Defaultmenu, DetachedFn, DoubletFn, iconOverayFn, iconText } from "../../../common/switcherdata";
import { useAuth } from "../../../providers/AuthProvider";

const Header = ({ local_varaiable, ThemeChanger }) => {
  const { user, setUser } = useAuth();
  // window screen resize
  useEffect(() => {
    function debounce(func, delay) {
      let timeoutId;

      return function () {
        const context = this;
        const args = arguments;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
          func.apply(context, args);
        }, delay);
      };
    }

    const handleResize = () => {
      const windowObject = window;
      if (windowObject.innerWidth <= 991) {
        const theme = store.getState();
        ThemeChanger({ ...theme, toggled: "close" });
      } else {
        if (localStorage.Syntoverticalstyles) {
          let verticalStyles = localStorage.getItem("Syntoverticalstyles");
          switch (verticalStyles) {
            case "default":
              Defaultmenu(ThemeChanger);
              break;
            case "closed":
              Closedmenu(ThemeChanger);
              break;
            case "icontext":
              iconText(ThemeChanger);
              break;
            case "overlay":
              iconOverayFn(ThemeChanger);
              break;
            case "detached":
              DetachedFn(ThemeChanger);
              break;
            case "doublemenu":
              DoubletFn(ThemeChanger);
              break;
          }
        } else {
          const theme = store.getState();
          ThemeChanger({
            ...theme,
            toggled: "",
            // "dataVerticalStyle":"default"
          });
        }
      }
    };
    handleResize(); // Check on component mount
    const debouncedResize = debounce(handleResize, 300);
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  function menuClose() {
    const theme = store.getState();
    ThemeChanger({ ...theme, toggled: "close" });
  }

  const toggleSidebar = () => {
    const theme = store.getState();
    let sidemenuType = theme.dataNavLayout;
    if (window.innerWidth >= 992) {
      console.log("Workinh", sidemenuType, theme.dataVerticalStyle);
      if (sidemenuType === "vertical") {
        let verticalStyle = theme.dataVerticalStyle;
        switch (verticalStyle) {
          // closed
          case "closed":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "close-menu-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "close-menu-close" });
            }
            break;
          // icon-overlay
          case "overlay":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "icon-overlay-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              if (window.innerWidth >= 992) {
                ThemeChanger({ ...theme, toggled: "icon-overlay-close" });
              }
            }
            break;
          // icon-text
          case "icontext":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "icon-text-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "icon-text-close" });
            }
            break;
          // doublemenu
          case "doublemenu":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "double-menu-open") {
              ThemeChanger({ ...theme, toggled: "double-menu-close" });
            } else {
              let sidemenu = document.querySelector(".side-menu__item.active");
              if (sidemenu) {
                ThemeChanger({ ...theme, toggled: "double-menu-open" });
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add("double-menu-active");
                } else {
                  ThemeChanger({ ...theme, toggled: "" });
                }
              }
            }

            // doublemenu(ThemeChanger);
            break;
          // detached
          case "detached":
            if (theme.toggled === "detached-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "detached-close" });
            }
            break;
          // default
          case "default":
            ThemeChanger({ ...theme, toggled: "" });
        }
      }
    } else {
      const theme = store.getState();
      if (theme.toggled === "close") {
        ThemeChanger({ ...theme, toggled: "open" });
        setTimeout(() => {
          if (theme.toggled == "open") {
            document.querySelector("#responsive-overlay").classList.add("active");
            document.querySelector("#responsive-overlay").addEventListener("click", () => {
              document.querySelector("#responsive-overlay").classList.remove("active");
              menuClose();
            });
          }
          window.addEventListener("resize", () => {
            if (window.screen.width >= 992) {
              document.querySelector("#responsive-overlay").classList.remove("active");
            }
          });
        }, 100);
      } else {
        ThemeChanger({ ...theme, toggled: "close" });
      }
    }
  };

  //Dark Model
  const ToggleDark = () => {
    ThemeChanger({
      ...local_varaiable,
      class: local_varaiable.class == "dark" ? "light" : "dark",
      dataHeaderStyles: local_varaiable.dataHeaderStyles == "dark" ? "light" : "dark",
    });
    const theme = store.getState();

    if (theme.class != "dark") {
      ThemeChanger({ ...theme, bodyBg: "", darkBg: "" });
      localStorage.setItem("Syntolighttheme", "light");
      localStorage.removeItem("Syntodarktheme");
    } else {
      localStorage.setItem("Syntodarktheme", "dark");
      localStorage.removeItem("Syntolighttheme");
    }
  };

  //full screen
  let elem = document.documentElement;
  let [i, seti] = useState(true);
  const Fullscreen = (vale) => {
    switch (vale) {
      case true:
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          /* IE11 */
          elem.msRequestFullscreen();
        }
        seti(false);
        break;
      case false:
        document.exitFullscreen();
        seti(true);
        break;
    }
  };

  useEffect(() => {
    const navbar = document.querySelector(".header");
    const navbar1 = document.querySelector(".app-sidebar");
    const sticky = navbar.clientHeight;
    // const sticky1 = navbar1.clientHeight;

    function stickyFn() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky-pin");
        navbar1.classList.add("sticky-pin");
      } else {
        navbar.classList.remove("sticky-pin");
        navbar1.classList.remove("sticky-pin");
      }
    }

    window.addEventListener("scroll", stickyFn);
    window.addEventListener("DOMContentLoaded", stickyFn);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener("scroll", stickyFn);
      window.removeEventListener("DOMContentLoaded", stickyFn);
    };
  }, []);

  console.log({ user });

  return (
    <Fragment>
      <header className="header custom-sticky !top-0 !w-full">
        <nav className="main-header" aria-label="Global">
          <div className="header-content">
            <div className="header-left">
              <div className="">
                <button type="button" className="sidebar-toggle" onClick={() => toggleSidebar()}>
                  <span className="sr-only">Toggle Navigation</span>
                  <i className="ri-arrow-right-circle-line header-icon"></i>
                </button>
              </div>
            </div>

            <div className="responsive-logo">
              <Link
                className="responsive-logo-dark"
                to={`${import.meta.env.BASE_URL}dashboards/sales`}
                aria-label="Brand"
              >
                <img src={ALLImages("logo")} alt="logo" className="mx-auto" />
              </Link>
              <Link
                className="responsive-logo-light"
                to={`${import.meta.env.BASE_URL}dashboards/sales`} aria-label="Brand">
                <img src={ALLImages("dark")} alt="logo" className="mx-auto" />
              </Link>
            </div>
            <div className="header-right">
              <div className="responsive-headernav">
                <div className="header-nav-right">
                  <div className="header-theme-mode hidden sm:block" onClick={() => ToggleDark()}>
                    <Link
                      aria-label="anchor"
                      className="hs-dark-mode-active:hidden flex hs-dark-mode group flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-gray-100 hover:bg-gray-200 text-gray-500 align-middle focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-white/70 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                      to="#"
                      data-hs-theme-click-value="dark"
                    >
                      <i className="ri-moon-line header-icon"></i>
                    </Link>
                    <Link
                      aria-label="anchor"
                      className="hs-dark-mode-active:flex hidden hs-dark-mode group flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-gray-100 hover:bg-gray-200 text-gray-500 align-middle focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-white/70 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                      to="#"
                      data-hs-theme-click-value="light"
                    >
                      <i className="ri-sun-line header-icon"></i>
                    </Link>
                  </div>

                  <div className="header-fullscreen hidden lg:block" onClick={() => Fullscreen(i)}>
                    <Link
                      aria-label="anchor"
                      to="#"
                      className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-gray-100 hover:bg-gray-200 text-gray-500 align-middle focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-white/70 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                    >
                      <i className="ri-fullscreen-line header-icon full-screen-open"></i>
                      <i className="ri-fullscreen-line header-icon fullscreen-exit-line hidden"></i>
                    </Link>
                  </div>
                  <div
                    className="header-notification hs-dropdown ti-dropdown hidden sm:block"
                    data-hs-dropdown-placement="bottom-right"
                  >
                    <button
                      id="dropdown-notification"
                      type="button"
                      className="hs-dropdown-toggle ti-dropdown-toggle p-0 border-0 flex-shrink-0 h-[2.375rem] w-[2.375rem] rounded-full shadow-none focus:ring-gray-400 text-xs dark:focus:ring-white/10"
                    >
                      <i className="ri-notification-2-line header-icon animate-bell"></i>
                      <span className="flex absolute h-5 w-5 top-0 ltr:right-0 rtl:left-0 -mt-1 ltr:-mr-1 rtl:-ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/80 opacity-75"></span>
                        <span
                          className="relative inline-flex rounded-full h-5 w-5 bg-success text-white justify-center items-center"
                          id="notify-data"
                        >
                          4
                        </span>
                      </span>
                    </button>
                    <div
                      className="hs-dropdown-menu ti-dropdown-menu w-[20rem] border-0"
                      aria-labelledby="dropdown-notification">
                      <div className="ti-dropdown-header !bg-primary border-b dark:border-white/10 flex justify-between items-center">
                        <p className="ti-dropdown-header-title !text-white font-semibold">Notifications</p>
                        <Link to="#" className="badge bg-black/20 text-white rounded-sm">
                          Mark All Read
                        </Link>
                      </div>
                      <div className="ti-dropdown-divider divide-y divide-gray-200 dark:divide-white/10">
                        <div className="py-2 first:pt-0 last:pb-0" id="allNotifyContainer">
                          <div className="ti-dropdown-item relative header-box">
                            <Link
                              to={`${import.meta.env.BASE_URL}pagecomponent/mail/mainMail/`}
                              className="flex space-x-3 rtl:space-x-reverse"
                            >
                              <div className="ltr:mr-2 rtl:ml-2 avatar rounded-full ring-0">
                                <img src={ALLImages("jpg73")} alt="img" className="rounded-sm" />
                              </div>
                              <div className="relative w-full">
                                <h5 className="text-sm text-gray-800 dark:text-white font-semibold mb-1">Elon Isk</h5>
                                <p className="text-xs mb-1 max-w-[200px] truncate">
                                  Hello there! How are you doing? Call me when...
                                </p>
                                <p className="text-xs text-gray-400 dark:text-white/70">2 min</p>
                              </div>
                            </Link>
                            <Link
                              aria-label="anchor"
                              to="#"
                              className="header-remove-btn ltr:ml-auto rtl:mr-auto text-lg text-gray-500/20 dark:text-white/20 hover:text-gray-800 dark:hover:text-white"
                            >
                              <i className="ri-close-circle-line"></i>
                            </Link>
                          </div>
                          <div className="ti-dropdown-item relative header-box">
                            <Link
                              to={`${import.meta.env.BASE_URL}pagecomponent/mail/mainMail/`}
                              className="flex items-center space-x-3 rtl:space-x-reverse"
                            >
                              <div className="ltr:mr-2 rtl:ml-2 avatar rounded-full ring-0">
                                <img src={ALLImages("jpg58")} alt="img" className="rounded-sm" />
                              </div>
                              <div className="relative w-full">
                                <h5 className="text-sm text-gray-800 dark:text-white font-semibold mb-1">
                                  Shakira Sen
                                </h5>
                                <p className="text-xs mb-1 max-w-[200px] truncate">
                                  I would like to discuss about that assets...
                                </p>
                                <p className="text-xs text-gray-400 dark:text-white/70">09:43</p>
                              </div>
                            </Link>
                            <Link
                              aria-label="anchor"
                              to="#"
                              className="header-remove-btn ltr:ml-auto rtl:mr-auto text-lg text-gray-500/20 dark:text-white/20 hover:text-gray-800 dark:hover:text-white"
                            >
                              <i className="ri-close-circle-line"></i>
                            </Link>
                          </div>
                          <div className="ti-dropdown-item relative header-box">
                            <Link
                              to={`${import.meta.env.BASE_URL}pagecomponent/mail/mainMail/`}
                              className="flex items-center space-x-3 rtl:space-x-reverse"
                            >
                              <div className="ltr:mr-2 rtl:ml-2 avatar rounded-full ring-0">
                                <img src={ALLImages("jpg77")} alt="img" className="rounded-sm" />
                              </div>
                              <div className="relative w-full">
                                <h5 className="text-sm text-gray-800 dark:text-white font-semibold mb-1">Sebastian</h5>
                                <p className="text-xs mb-1 max-w-[200px] truncate">
                                  Shall we go to the cafe at downtown...
                                </p>
                                <p className="text-xs text-gray-400 dark:text-white/70">yesterday</p>
                              </div>
                            </Link>
                            <Link
                              aria-label="anchor"
                              to="#"
                              className="header-remove-btn ltr:ml-auto rtl:mr-auto text-lg text-gray-500/20 dark:text-white/20 hover:text-gray-800 dark:hover:text-white"
                            >
                              <i className="ri-close-circle-line"></i>
                            </Link>
                          </div>
                          <div className="ti-dropdown-item relative header-box">
                            <Link
                              to={`${import.meta.env.BASE_URL}pagecomponent/mail/mainMail/`}
                              className="flex items-center space-x-3 rtl:space-x-reverse"
                            >
                              <div className="ltr:mr-2 rtl:ml-2 avatar rounded-full ring-0">
                                <img src={ALLImages("jpg67")} alt="img" className="rounded-sm" />
                              </div>
                              <div className="relative w-full">
                                <h5 className="text-sm text-gray-800 dark:text-white font-semibold mb-1">
                                  Charlie Davieson
                                </h5>
                                <p className="text-xs mb-1 max-w-[200px] truncate">
                                  Lorem ipsum dolor sit amet, consectetur
                                </p>
                                <p className="text-xs text-gray-400 dark:text-white/70">yesterday</p>
                              </div>
                            </Link>
                            <Link
                              aria-label="anchor"
                              to="#"
                              className="header-remove-btn ltr:ml-auto rtl:mr-auto text-lg text-gray-500/20 dark:text-white/20 hover:text-gray-800 dark:hover:text-white"
                            >
                              <i className="ri-close-circle-line"></i>
                            </Link>
                          </div>
                        </div>
                        <div className="py-2 first:pt-0 px-5">
                          <Link
                            className="w-full ti-btn ti-btn-primary p-2"
                            to={`${import.meta.env.BASE_URL}pagecomponent/mail/mainMail/`}
                          >
                            View All
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="header-profile hs-dropdown ti-dropdown" data-hs-dropdown-placement="bottom-right">
                    <button
                      id="dropdown-profile"
                      type="button"
                      className="hs-dropdown-toggle ti-dropdown-toggle gap-2 p-0 flex-shrink-0 h-8 w-8 rounded-full shadow-none focus:ring-gray-400 text-xs dark:focus:ring-white/10"
                    >
                      <img
                        className="inline-block rounded-full ring-2 ring-white dark:ring-white/10"
                        src={ALLImages("jpg57")}
                        alt="Image Description"
                      />
                    </button>

                    <div
                      className="hs-dropdown-menu ti-dropdown-menu border-0 w-[20rem]"
                      aria-labelledby="dropdown-profile"
                    >
                      <div className="ti-dropdown-header !bg-primary flex">
                        <div className="ltr:mr-3 rtl:ml-3">
                          <img
                            className="avatar shadow-none rounded-full !ring-transparent"
                            src={ALLImages("jpg57")}
                            alt="profile-img"
                          />
                        </div>
                        <div>
                          <p className="ti-dropdown-header-title !text-white">
                            {user.username} {user.lastName}
                          </p>
                          <p className="ti-dropdown-header-content !text-white/50">{user.currency}</p>
                        </div>
                      </div>
                      <div className="mt-2 ti-dropdown-divider">
                        <Link
                          to={`${import.meta.env.BASE_URL}pagecomponent/profile/home/`}
                          className="ti-dropdown-item"
                        >
                          <i className="ti ti-user-circle text-lg"></i>
                          Profile
                        </Link>
                        <Link
                          to={`${import.meta.env.BASE_URL}pagecomponent/profile/profilesetting/`}
                          className="ti-dropdown-item"
                        >
                          <i className="ti ti-adjustments-horizontal text-lg"></i>
                          Settings
                        </Link>

                        <div
                          className="ti-dropdown-item cursor-pointer"
                          onClick={() => {
                            setUser(null);
                          }}
                        >
                          <i className="ti ti-logout  text-lg"></i>
                          Log Out
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="switcher-icon">
                    <button
                      aria-label="button"
                      type="button"
                      className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-gray-100 hover:bg-gray-200 text-gray-500 align-middle focus:outline-none focus-visible:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-white/70 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                      data-hs-overlay="#hs-overlay-switcher">
                      <i className="ri-settings-5-line header-icon animate-spin"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  local_varaiable: state,
});
export default connect(mapStateToProps, { ThemeChanger })(Header);
