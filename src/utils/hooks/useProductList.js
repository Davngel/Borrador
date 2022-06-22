import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useProductList() {
  const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
  const [productList, setProductList] = useState(() => ({
    data: {},
    isLoading: true,
  }));

  useEffect(() => {
    if (!apiRef || isApiMetadataLoading) {
      return () => {};
    }

    const controller = new AbortController();

    async function getProductList() {
      try {
        setProductList({ data: {}, isLoading: true });

        const response = await fetch(
          `${API_BASE_URL}/documents/search?ref=${apiRef}&q=%5B%5Bat(document.type%2C%20%22product%22)%5D%5D&lang=en-us&pageSize=12`,
          {
            signal: controller.signal,
          }
        );
        const data = await response.json();

        setProductList({ data, isLoading: false });
      } catch (err) {
        setProductList({ data: {}, isLoading: false });
        console.error(err);
      }
    }

    getProductList();

    return () => {
      controller.abort();
    };
  }, [apiRef, isApiMetadataLoading]);

  return productList;
}
