import React,{useState,useEffect} from "react";
import Pagination from "./pagination";
import Categoria from "./categories";
import ProductList from "./productList";
import { useParams } from "react-router-dom";
import Spinner from './loading'
import "./styles/homeStore.css";
import {getProducts, getCategorys, getItemByCat, getItemByName} from './catalogUtils'


// API

const HomeStore = (props) => {

  //DECLARACIONES
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [category,setCategory] = useState([]);
  const [currentPage,setCurrentPage ] = useState (1);
  const [productsEachPage] = useState(8);
  const [filter, setFilter] = useState(false);
  const { cat } = useParams();
  const { match: { params: { name }}} = props;

  function filterCat(){
    setFilter(!filter)
  }
  
  useEffect(() => {
    if (cat) {
      setLoading(true);
      getItemByCat(cat).then((res) => {
        setProduct(res.data);
      });
      setTimeout(() => {setLoading(false)}, 2000);
    } 
    else {
      if(!name){
        setLoading(true);
        getProducts.then((res) => {setProduct(res.data);});
        setTimeout(() => {setLoading(false)}, 2000);
      }
      else{
        handlerSearch(name)
      }

    }
    getCategorys.then((res) => {
      setCategory(res.data);
    });
    // eslint-disable-next-line
  }, [filter]);
   


  //CHANGE PAGE FUNCTION
  const paginate = ( pageNumber ) => {
    setCurrentPage(pageNumber) }
  

  const handlerFilter = (catId)=>{
    setCurrentPage(1);
    setLoading(true);
    getItemByCat(catId).then((res) => { setProduct(res.data) })
    setTimeout(() => {setLoading(false)}, 2000);
  } 

  const handlerSearch = (search) => {
    setCurrentPage(1);
    setLoading(true);
    getItemByName(search).then((res) => { console.log(res.data) ; setProduct(res.data)})
      .catch( err => console.log( err ) );
    setTimeout(() => {setLoading(false)}, 2000);
  }

  const handlerClear = ()=>{
    setCurrentPage(1);
    getProducts.then((res) => { setProduct(res.data) });
  }

  //PAGES
  const indexOfLastPost = currentPage * productsEachPage;
  const indexOfFirstPost = indexOfLastPost - productsEachPage;
  const currentPosts = product.slice(indexOfFirstPost, indexOfLastPost);


  return (
    <>
    <div className={`firstContainer container col-12 col-lg-10 text-center pb-0 mb-5`}>
        <div className="mt-5 my-3 mx-0 mx-xl-5 px-xl-5">
          {category && <Categoria filterCat={filterCat} categorys={category}  filter={handlerFilter} onSearch={handlerSearch} onClear={handlerClear}/> }
        </div>
        <div className="d-flex justify-content-center">
          {loading ? <Spinner /> : <ProductList product={currentPosts} /> }
        </div>
        <div className="d-flex justify-content-center">
          <Pagination postsPerPage={productsEachPage} totalPosts={product.length} paginate={paginate}/>
        </div> 
    </div>
  </>
  );
};

export default HomeStore;