import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("getOffer"), href: "/get-offer" },
  ];

  const pathname = window.location.pathname;

  const changeLang = () => {
    document
      .getElementsByTagName("html")[0]
      .setAttribute("lang", i18n.language);
  };
  changeLang();
  const handleLangArabic = () => {
    i18n.changeLanguage("ar");
    document.body.setAttribute("class", "arabic");
  };
  const handleLangEnglish = () => {
    i18n.changeLanguage("en");
    document.body.removeAttribute("class");
  };
  return (
    <div className="border-b-2">
      
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div
                  className={`absolute inset-y-0 start-0 flex items-center sm:hidden`}
                >
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-0 items-center">
                    <img className="h-8 w-auto" src={logo} alt="Your Company" />
                  </div>
                  <div className="hidden flex-1 sm:ml-6 sm:block">
                    <div className="flex justify-center">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.href == pathname ||
                              item.href == pathname ||
                              item.href == pathname ||
                              item.href == pathname
                              ? "text-gray-900"
                              : "text-gray-500",
                            "rounded-md px-3 mx-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`flex-0 absolute inset-y-0 end-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0`}
                  >
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="font-lg text-gray ">
                          <GlobeAltIcon
                            className="-mr-1 h-5 w-5 text-gray"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          className={`absolute ${
                            i18n.language === "en" ? "right-0" : "left-0"
                          }  z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                        >
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  onClick={handleLangEnglish}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  English
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  onClick={handleLangArabic}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  العربية
                                </div>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.href == pathname ||
                        item.href == pathname ||
                        item.href == pathname ||
                        item.href == pathname
                        ? "text-gray-900"
                        : "text-gray-500",
                      "block rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Navbar;
