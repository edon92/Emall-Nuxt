import axios from 'axios'

const Goods = {
  _getDetail(goodId) {
    return axios.get(`/good/getDetail?goodsId=${goodId}`)
  },
  _getHomeData() {
    return axios.get('/good/homeData')
  },
  _getCategory() {
    return axios.get('/good/getCategoryList')
  },
  _getCategoryById(id) {
    return axios.get(`/good/getCategoryListById?categoryId=${id}`)
  },
  _getCategorySubList(categorySubId) {
    return axios.get(`/good/getCategorySubList?categorySubId=${categorySubId}`)    
  },
  _getGoodsList(id,page) {
    return axios.get(`/good/getGoodsList2?goodsListId=${id}&page=${page}`)    
  },
  _getGoodsMaxPage(id) {
    return axios.get(`/good/getGoodsListMaxPage?goodsListId=${id}`)
  },
  _searchByKeyword(keyword) {
    return axios.get(`/good/searchGoods?keyword=${keyword}`)
  }
}

export default Goods
