"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface SetUrlParamOptions {
  replace?: boolean;
}

const useUrlParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Set a single URL parameter
   */
  const setUrlParam = useCallback(
    (key: string, value: string | null, options: SetUrlParamOptions = {}) => {
      const params = new URLSearchParams(searchParams?.toString());

      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      const url = `${pathname}?${params.toString()}`;

      if (options.replace) {
        router.replace(url);
      } else {
        router.push(url);
      }
    },
    [pathname, router, searchParams]
  );

  /**
   * Set multiple URL parameters at once
   */
  const setUrlParams = useCallback(
    (
      params: Record<string, string | null>,
      options: SetUrlParamOptions = {}
    ) => {
      const urlParams = new URLSearchParams(searchParams?.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === "") {
          urlParams.delete(key);
        } else {
          urlParams.set(key, value);
        }
      });

      const url = `${pathname}?${urlParams.toString()}`;

      if (options.replace) {
        router.replace(url);
      } else {
        router.push(url);
      }
    },
    [pathname, router, searchParams]
  );

  /**
   * Get a single URL parameter
   */
  const getUrlParam = useCallback(
    (key: string) => {
      return searchParams?.get(key) || null;
    },
    [searchParams]
  );

  /**
   * Get all URL parameters as an object
   */
  const getAllUrlParams = useCallback(() => {
    const params: Record<string, string> = {};
    searchParams?.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  /**
   * Remove a single URL parameter
   */
  const removeUrlParam = useCallback(
    (key: string, options: SetUrlParamOptions = {}) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.delete(key);

      const url = `${pathname}?${params.toString()}`;

      if (options.replace) {
        router.replace(url);
      } else {
        router.push(url);
      }
    },
    [pathname, router, searchParams]
  );

  /**
   * Clear all URL parameters
   */
  const clearUrlParams = useCallback(
    (options: SetUrlParamOptions = {}) => {
      if (options.replace) {
        router.replace(pathname);
      } else {
        router.push(pathname);
      }
    },
    [pathname, router]
  );

  return {
    setUrlParam,
    setUrlParams,
    getUrlParam,
    getAllUrlParams,
    removeUrlParam,
    clearUrlParams,
  };
};

export default useUrlParams;
