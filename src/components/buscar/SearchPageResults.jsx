import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../utils/constants";
import { useLatestAPI } from "../../utils/hooks/useLatestAPI";

const SearchPageResults = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [searchTerm, setSearchTerm] = useState()

    useEffect(() => {
setSearchTerm(searchParams.get("q"))
    }, [search])
    

  const useSearchTerm = () => {
    const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
    const [searchTermProduct, setSearchTermProduct] = useState(() => ({
      data: {},
      isLoading: true,
    }));
    useEffect(() => {
      if (!apiRef || isApiMetadataLoading) {
        return () => {};
      }

      const controller = new AbortController();

      async function getSearchTermProduct() {
        try {
          setSearchTermProduct({ data: {}, isLoading: true });

          const response = await fetch(
            `${API_BASE_URL}/documents/search?ref=${apiRef}&q=%5B%5Bat(document.type%2C%20%22product%22)%5D%5D&q=%5B%5Bfulltext(document%2C%20%22${searchTerm}%22)%5D%5D&lang=en-us&pageSize=20`,
            {
              signal: controller.signal,
            }
          );
          const data = await response.json();

          setSearchTermProduct({ data, isLoading: false });
        } catch (err) {
          setSearchTermProduct({ data: {}, isLoading: false });
          console.error(err);
        }
      }

      getSearchTermProduct();

      return () => {
        controller.abort();
      };
    }, [apiRef, isApiMetadataLoading]);

    return searchTermProduct;
  };

  const { data, isLoading } = useSearchTerm();

  const [pageNumber, setPageNumber]= useState(1)
  const [tope, setTope] = useState(20)
  const postNumber = 20

  let currentPageNumber =  (pageNumber * postNumber) - postNumber 

  const handlePrev =()=>{
      if(pageNumber == 1) return
      setPageNumber(pageNumber - 1)
      setTope(tope-20)
  }
  const handleNext =()=>{
      setPageNumber(pageNumber + 1)
      setTope(tope+20)
  }


  return (
    <div>
      {isLoading ? (
        <div></div>
      ):
      
      (data.total_results_size === 0 ) ? (<div>Not a match</div>) 

      :
      
      
      ( 
        <div>
          {data.results.slice(currentPageNumber, tope).map((result, index) => {
            return (
              <div key={index}>
                <h3>{result.data.name}</h3>
                <img src={result.data.mainimage.url} alt={result.data.name}/>
                <p>{result.data.category.slug}</p>
                <p>${result.data.price}</p>
                <p>{result.data.short_description}</p>
                <button>Add to car</button>

              </div>
            );
          })}
          <div>
          <button onClick={handlePrev} >prev</button>
          <button onClick={handleNext}>next</button>
          </div>
        </div>
      )
      
      
      
      
      
      
      
      
      
      }
    </div>
  );
};

export default SearchPageResults;
