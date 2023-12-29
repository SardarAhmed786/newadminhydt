import axios from 'axios';
// import { API_URL } from '../utils/ApiURL';
// import { useDispatch } from 'react-redux'

// import { useSelector } from 'react-redux';
export const AddProfile = async (data) => {
    // console.log("data", data)
    // const addUser = await axios.post(`${API_URL}/v1/auth/register`, data)
    //     .then((res) => {
    //         // console.log("res", res)
    //         return res;
    //     }).catch((e) => {
    //         console.log("err", e)
    //         return e;
    //     });
    // return addUser
}

export const LoginProfile = async (data) => {
    // const addUser = await axios.post(`${API_URL}/v1/auth/login`, data)
    //     .then((res) => {
    //         // console.log("res", res);
    //         // const push = (toast) => 
    //         return res;
    //     }).catch((e) => {
    //         console.log("err", e)
    //         return e;
    //     });
    // return addUser
}

export const EditProfile = async (data, file, datatoken, account) => {
    // const tokenauth = useSelector((state) => state.UserReducer.tokenauth)
    // console.log("tokenauth", data, file, datatoken, account)

    const formData = new FormData()
    formData.append('picture', file)
    formData.append('walletAddress', account)
    formData.append('name', data.name)
    formData.append('username', data.username)
    formData.append('bio', data.bio)

    // const send = { ...data, ipfsImageUrl: file }
    // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzYzOTQwMzUsImlhdCI6MTYzNjM3MjQzNSwic3ViIjoiNjE4OGM2ZTM3YjYxOWM2MmQzMjA2OGE3IiwiYWRkcmVzcyI6IjB4N2VmOGU1NjQzNDI0YmVkNzYzZGQxYmRlNjZkNGIyZjc5ZjllZGNkOCJ9.1L86TDVAWq-uCAf8mTQXn8ERK6xcNVZgn9QbJIeqohA";
    // const send = { ...data, picture: file }
    // const editUser = await axios.patch(`${API_URL}/v1/users`, formData, { headers: { Authorization: `Bearer ${datatoken}`, "Content-Type": 'multipart/form-data' } })
    // const editUser = await axios.post(`${API_URL}/v1/users/editUser`, formData, { headers: { "Content-Type": 'multipart/form-data' } })
    //     .then((res) => {
    //         // console.log(res)
    //         return true;
    //     }).catch((e) => {
    //         console.log("err", e)
    //         return false;
    //     });
    // return editUser
}

export const CreateNft = async (data, file) => {
    const send = { ...data, ipfsImageUrl: file }
    // const createNFT = await axios.post(`${API_URL}/user/editUser`, send)
    //     .then((res) => {
    //         // console.log(res)
    //         try {
    //         } catch (err) {
    //             console.log("err", err)
    //             // return false;
    //         }
    //     })
    // return create}

export const addToken = async (data, inputList, contractAddress, account, formDataFile, tokenId, datatoken) => {

    console.log("data", data)

    const formData = new FormData()
    formData.append('image', formDataFile)
    formData.append('walletAddress', account)
    formData.append('contractAddress', contractAddress)
    formData.append('tokenID', tokenId)
    formData.append('category', 'Category')
    formData.append('name', data.titleName)
    formData.append('description', data.descriptionn)
    // formData.append('royalties' ,data.royalty )
    formData.append('attributes', JSON.stringify(inputList))
    // console.log("tokenauth", datatoken)

    // await axios.post(`${API_URL}/v1/token/addToken`, formData, { headers: { Authorization: `Bearer ${datatoken}`, "Content-Type": 'multipart/form-data' } })
    //     .then((res) => {
    //         // console.log("res", res)
    //         return res;
    //     }).catch((err) => {
    //         console.log("err", err)
    //         return err;
    //     })
}

export const addTokenAndPutOnSale = async (data, inputList, contractAddress, account, formDataFile, tokenId, datatoken) => {


    // const send = { data, attributes: inputList, contractAddress: contractAddress, walletAddress: account, imageUrl: fileUrl, tokenID: tokenId }
    // const send = {
    //     description: data.descriptionn,
    //     royalties: data.royalty, instantSalePrice: data.minimum, priceforsale: data.minimum, category: inputList[0].trait_type,
    //     name: inputList[0].value, contractAddress: contractAddress, walletAddress: account, image: fileUrl, tokenID: tokenId
    // }
    // console.log("res", data)
    // console.log("res", inputList)
    // console.log("res", contractAddress, account, tokenId)

    const formData = new FormData()
    formData.append('image', formDataFile)
    formData.append('walletAddress', account)
    formData.append('contractAddress', contractAddress)
    formData.append('tokenID', tokenId)
    formData.append('category', 'category')
    formData.append('name', data.titleName)
    formData.append('description', data.descriptionn)
    formData.append('royalties', data.royalty)
    formData.append('attributes', JSON.stringify(inputList))
    formData.append('priceforsale', data.dailyprice)
    formData.append('instantSalePrice', data.dailyprice)
    formData.append('currency', "BNB")
    formData.append('sale', true)
    formData.append('salePrice', true)

    // await axios.post(`${API_URL}/v1/token/addTokenAndPutOnSale`, formData, { headers: { Authorization: `Bearer ${datatoken}`, "Content-Type": 'multipart/form-data' } })
    //     .then((res) => {
    //         // console.log("res", res)
    //         return res;
    //     }).catch((err) => {
    //         console.log("err", err)
    //         return err;
    //     })
}

export const AddCollection = async (data, contractAddress, account, formDataFile) => {
    const formData = new FormData()
    formData.append('image', formDataFile)
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('symbol', data.symbol)
    formData.append('publicUrl', data.publicUrl)
    formData.append('contractAddress', contractAddress)
    formData.append('creator', account)
    formData.append('royalties', data.royalty)
    // formData.append('attributes' ,JSON.parse(inputList) )

    // const send = { name: data.name, description: data.description, symbol: data.symbol, publicUrl: data.publicUrl, contractAddress: contractAddress, creator: account, image: formData }
    // const editUser = await axios.post(`${API_URL}/v1/collection/addCollection`, formData, { headers: { "Content-Type": 'multipart/form-data' } })
    //     .then((res) => {
    //         // console.log("res", res)
    //     }).catch((err) => {
    //         console.log("err", err)
    //     })
    // return editUser
}
export const AddCollectionwtihMultipleImages = async (data, contractAddress, account, formDataFile, formDataFile1) => {
    const royaltyRound = Math.round(data.royalty);
    console.log("===============>royaltyRound", royaltyRound);

    const formData = new FormData()
    formData.append('creator', account)
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('symbol', data.symbol)
    formData.append('publicUrl', data.publicUrl)
    formData.append('contractAddress', contractAddress)
    formData.append('image', formDataFile)
    formData.append('coverImage', formDataFile1)
    formData.append('websiteLink', data.website);
    formData.append('royalties', royaltyRound);

    // formData.append('attributes' ,JSON.parse(inputList) )

    // const send = { name: data.name, description: data.description, symbol: data.symbol, publicUrl: data.publicUrl, contractAddress: contractAddress, creator: account, image: formData }
    // const editUser = await axios.post(`${API_URL}/v1/collection/addCollectionWithMultipleImages`, formData, { headers: { "Content-Type": 'multipart/form-data' } })
    //     .then((res) => {
    //         // console.log("res", res)
    //     }).catch((err) => {
    //         console.log("err", err)
    //     })
    // return editUser
}

export const PurchaseApi = async (buyerAddress, contractAddress, tokenID, price, sellerAddress, royalties) => {
    console.log("data", buyerAddress, contractAddress, tokenID, price, sellerAddress, royalties)
    // const send = { buyerAddress, contractAddress, tokenID, price, sellerAddress, royalties }
    // const addUser = await axios.post(`${API_URL}/v1/sale/addSale`, { buyerAddress, contractAddress, tokenID, price, sellerAddress, royalties })
    //     .then((res) => {
    //         // console.log("res", res)
    //         return res;
    //     }).catch((e) => {
    //         console.log("err", e)
    //         return e;
    //     });
    // return addUser
}

export const OwnedApi = async (account) => {
    // console.log("data", buyerAddress, contractAddress, tokenID, price, sellerAddress, royalties)
    // const send = { buyerAddress, contractAddress, tokenID, price, sellerAddress, royalties }
    // const addUser = await axios.post(`${API_URL}/v1/token/getOwnedTokensOfUserAndDetails`, account)
    //     .then((res) => {
    //         // console.log("res", res)
    //         return res;
    //     }).catch((e) => {
    //         console.log("err", e)
    //         return e;
    //     });
    // return addUser
}