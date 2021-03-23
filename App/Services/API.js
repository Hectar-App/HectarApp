// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import R from 'ramda';
const apiURL = 'https://devbackend.devstagging.online:9090/api';

//const apiURL = 'https://devbackend.devstagging.online:9090/api';
// const apiURL = 'http://167.172.149.158:8080/api';
// const apiURL = 'https://dev.hectar.io/api/'

const create = (baseURL = apiURL) => {
  // ------
  // STEP 12
  // ------
  ///user/login?login=0566586882&password=123123
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      // 'API_KEY': 'b3f12bd8-2131-4d78-9279-749b954ed37a',
      // 'API_SECRET': '7dd060e0-0968-4607-9c0c-24ef726cf04f',
      // 'Content-Type': 'application/json'
    },
    // 90 second timeout...
    timeout: 90000,
  });

  const login = (phone, pass, uuid) =>
    api.post('loginUser', { phoneNumber: phone, password: pass, uuid });
  const checkPhone = phoneNumber => api.post('checkUser', { phoneNumber });
  const verifyPhone = (phoneNumber, confirmationCode) =>
    api.post('confirmRegister', { phoneNumber, confirmationCode });
  const registerUser = (name, phone, password, userType, email, location) => {
    const cleanObject = R.reject(R.isNil);
    const data = {
      name,
      phoneNumber: phone,
      password,
      userType,
      location,
      email,
      address: R.propOr(null, 'address', location),
    };
    return api.post('addUser', cleanObject(data));
  };
  const userTypes = () => api.get('userTypes/getUserTypes');
  const editUser = user => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    });

    let { name, phone, prevPassword, password, userType, email } = user;

    let ar =
      email && password
        ? { name, phoneNumber: phone, prevPassword, password, userType, email }
        : email && !password
        ? { name, phoneNumber: phone, userType, email }
        : !email && !password
        ? { name, phoneNumber: phone, userType, email: '' }
        : !email &&
          password && {
            name,
            phoneNumber: phone,
            userType,
            email: '',
            prevPassword,
            password,
          };

    return api.post('updateUser', ar);
  };
  const forgetPassword = phoneNumber =>
    api.post('forgetPassword', { phoneNumber });
  const forgetPasswordVerifyPhone = (phoneNumber, confirmationCode) =>
    api.post('confirmForgetCode', { phoneNumber, confirmationCode });
  const resetPassword = (phoneNumber, confirmationCode, password) =>
    api.post('resetPassword', { phoneNumber, confirmationCode, password });

  const getRealEstateAddingInfo = () => api.get('realEstate/AddAqarInfo');
  const addRealEstate = (realEstateToAdd, token) => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    let form = new FormData();
    for (var key in realEstateToAdd) {
      key !== 'images' &&
        key !== 'populationType' &&
        key !== 'numberOfLikes' &&
        key !== 'bluePrint' &&
        key !== 'requests' &&
        key !== 'status' &&
        key !== 'purpose' &&
        key !== 'features' &&
        key !== 'address' &&
        key !== 'selectedSides' &&
        key !== 'type' &&
        form.append(key, realEstateToAdd[key]);
    }
    // form.append('address.lat', realEstateToAdd.address.lat)
    // form.append('address.long', realEstateToAdd.address.long)
    console.log('rea', realEstateToAdd);
    form.append('address.coordinates[0]', realEstateToAdd.address.lat);
    form.append('address.coordinates[1]', realEstateToAdd.address.long);
    form.append('address.type', 'Point');
    form.append('address.address', realEstateToAdd.address.address);
    form.append('address.city', realEstateToAdd.address.city);

    // realEstateToAdd.selectedPopulationType && form.append('populationType', realEstateToAdd.selectedPopulationType)

    if (realEstateToAdd.type) {
      form.append('type', realEstateToAdd.type._id);
    }

    if (realEstateToAdd.populationType) {
      form.append('populationType', realEstateToAdd.populationType._id);
    }

    if (realEstateToAdd.status) {
      form.append('status', realEstateToAdd.status._id);
    }

    if (realEstateToAdd.purpose) {
      form.append('purpose', realEstateToAdd.purpose._id);
    }

    // if( realEstateToAdd.status ){
    //   form.append('status', realEstateToAdd.status._id)
    // }

    if (realEstateToAdd.selectedSides) {
      for (
        let index = 0;
        index < realEstateToAdd.selectedSides.length;
        index++
      ) {
        form.append(
          `selectedSides[${index}]`,
          realEstateToAdd.selectedSides[index],
        );
      }
    }

    if (realEstateToAdd.images) {
      for (let index = 0; index < realEstateToAdd.images.length; index++) {
        form.append('images', realEstateToAdd.images[index]);
      }
    }

    if (realEstateToAdd.bluePrint) {
      for (let index = 0; index < realEstateToAdd.bluePrint.length; index++) {
        form.append(
          'bluePrint[image]',
          realEstateToAdd.bluePrint[index].image,
          realEstateToAdd.bluePrint[index].image.name,
        );
        form.append(
          `bluePrint[${index}][title]`,
          realEstateToAdd.bluePrint[index].title,
        );
        form.append(
          `bluePrint[${index}][desc]`,
          realEstateToAdd.bluePrint[index].desc,
        );
      }
    }

    if (realEstateToAdd.features && realEstateToAdd.features.length > 0) {
      for (let index = 0; index < realEstateToAdd.features.length; index++) {
        form.append(
          `features[${index}]`,
          realEstateToAdd.features[index]._id
            ? realEstateToAdd.features[index]._id
            : realEstateToAdd.features[index],
        );
      }
    }

    if (realEstateToAdd.requests && realEstateToAdd.requests.length > 0) {
      for (let index = 0; index < realEstateToAdd.requests.length; index++) {
        form.append(`requests[${index}]`, realEstateToAdd.requests[index]);
      }
    }

    return api.post('realEstate/addRealEstate', form);
  };

  // numberOfUnit, payType, numberOfLivingRoom, numberOfBathRoom, numberOfRooms, floor
  const getRealEstate = data => {
    const {
      pageNumber,
      pageSize,
      lat1,
      long1,
      lat2,
      long2,
      maxPrice,
      minPrice,
      status,
      type,
      maxSpace,
      minSpace,
      numberOfUnit,
      payType,
      numberOfLivingRoom,
      numberOfBathRoom,
      numberOfRooms,
      floor,
    } = data;

    console.log('data before sened=> ', data);
    let link = `realEstate/getRealEstateFull?pageSize=${pageSize || 50}`;
    if (pageNumber) {
      link = link + `&pageNumber=${pageNumber}`;
    }

    if (lat1 && long1 && lat2 && long2) {
      link = link + `&lat1=${lat1}&long1=${long1}&lat2=${lat2}&long2=${long2}`;
    }

    if (numberOfRooms && numberOfRooms > 0) {
      link = link + `&numberOfRooms=${numberOfRooms}`;
    }

    if (numberOfLivingRoom && numberOfLivingRoom > 0) {
      link = link + `&numberOfLivingRoom=${numberOfLivingRoom}`;
    }

    if (numberOfBathRoom && numberOfBathRoom > 0) {
      link = link + `&numberOfBathRoom=${numberOfBathRoom}`;
    }

    if (numberOfUnit && numberOfUnit > 0) {
      link = link + `&numberOfUnit=${numberOfUnit}`;
    }

    if (payType && payType._id) {
      link = link + `&payType=${payType._id}`;
    }

    if (maxPrice && minPrice) {
      link = link + `&maxPrice=${maxPrice}&minPrice=${minPrice}`;
    }

    if (maxSpace && minSpace) {
      link = link + `&maxSpace=${maxSpace}&minSpace=${minSpace}`;
    }

    if (status && status._id) {
      link = link + `&status=${status._id}`;
    }

    if (type && type._id) {
      link = link + `&type=${type._id}`;
    }

    return api.get(link);
  };

  const getUserRealEstate = (_id, pageNumber) => {
    // api.setHeaders({
    //   'Content-Type': 'application/json',
    //   // 'Authorization': `Bearer ${token}`
    // })

    return api.post(`ownerRealEstates?pageSize=22&pageNumber=${pageNumber}`, {
      userId: _id,
    });
  };

  const refreshRealEstate = (_id, token) => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return api.get(`realEstate/refresh?_id=${_id}`);
  };

  const updateRealEstate = (realEstate, token) => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    let form = new FormData();
    for (var key in realEstate) {
      key !== 'images' &&
        key !== 'imagesSmall' &&
        key !== 'populationType' &&
        key !== 'shows' &&
        key !== 'numberOfLikes' &&
        key !== 'bluePrint' &&
        key !== 'status' &&
        key !== 'purpose' &&
        key !== 'owner' &&
        key !== 'createdAt' &&
        key !== 'type' &&
        key !== 'updatedAt' &&
        key !== '__v' &&
        key !== '_id' &&
        key !== 'features' &&
        key !== 'address' &&
        key !== 'selectedSides' &&
        key !== 'active' &&
        form.append(key, realEstate[key]);
    }

    if (realEstate.address) {
      form.append('address.coordinates[0]', realEstate.address.lat);
      form.append('address.coordinates[1]', realEstate.address.long);
      form.append('address.type', 'Point');
      form.append('address.address', realEstate.address.address);
      realEstate.address.city &&
        form.append('address.city', realEstate.address.city);
    }

    //  realEstate.selectedPopulationType && form.append('populationType', realEstate.selectedPopulationType)
    if (realEstate.type) {
      form.append('type', realEstate.type._id);
    }

    if (realEstate.populationType) {
      form.append('populationType', realEstate.populationType._id);
    }

    if (realEstate.status) {
      form.append('status', realEstate.status._id);
    }

    if (realEstate.purpose) {
      form.append('purpose', realEstate.purpose._id);
    }

    form.append('active', '1');
    // form.append('address', {
    //   "type": "Point",
    //   'coordinates[0]': realEstate.address.lat,
    //   'coordinates[1]': realEstate.address.long
    // })

    console.log('realEstate', realEstate);

    if (realEstate.selectedSides && realEstate.selectedSides.length > 0) {
      for (let index = 0; index < realEstate.selectedSides.length; index++) {
        form.append('selectedSides', realEstate.selectedSides[index]);
      }
    }

    if (realEstate.images && realEstate.images.length > 0) {
      for (let index = 0; index < realEstate.images.length; index++) {
        form.append(
          'images',
          realEstate.images[index],
          realEstate.images[index].name,
        );
      }
    }

    if (realEstate.imagesSmall && realEstate.imagesSmall.length > 0) {
      for (let index = 0; index < realEstate.imagesSmall.length; index++) {
        form.append(
          'imagesSmall',
          realEstate.imagesSmall[index],
          realEstate.imagesSmall[index].name,
        );
      }
    }

    if (realEstate.bluePrint && realEstate.bluePrint.length > 0) {
      // for (let index = 0; index < realEstate.bluePrint.length; index++) {
      //   // form.append('bluePrint[image]', realEstate.bluePrint[index].bluePrint, realEstate.bluePrint[index].bluePrint.name)
      //   // form.append('bluePrint', {title: realEstate.bluePrint[index].title, desc: realEstate.bluePrint[index].desc})
      //   form.append(`bluePrint${index}`, {image: realEstate.bluePrint[index].bluePrint, title: realEstate.bluePrint[index].title, desc: realEstate.bluePrint[index].desc})
      // }
      for (let index = 0; index < realEstate.bluePrint.length; index++) {
        form.append(
          'bluePrint[image]',
          realEstate.bluePrint[index].image,
          realEstate.bluePrint[index].image.name &&
            realEstate.bluePrint[index].image.name,
        );
        form.append(
          `bluePrint[${index}][title]`,
          realEstate.bluePrint[index].title,
        );
        form.append(
          `bluePrint[${index}][desc]`,
          realEstate.bluePrint[index].desc,
        );
      }
    }

    if (realEstate.features && realEstate.features.length > 0) {
      for (let index = 0; index < realEstate.features.length; index++) {
        form.append(
          `features[${index}]`,
          realEstate.features[index]._id
            ? realEstate.features[index]._id
            : realEstate.features[index],
        );
      }
    }

    console.log('form', form);
    // return null
    return api.post(`realEstate/updateRealEstate?id=${realEstate._id}`, form);
  };

  const deletRealEstate = (realEstate, token) => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.post(`realEstate/deleteRealEstate?id=${realEstate}`);
  };

  const addToFav = (realEstate, token) => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.post('addToFav', { realEstate: realEstate });
  };
  const removeFromFav = (realEstate, token) => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.post('deleteFromFav', { id: realEstate });
  };

  const getUserFav = token => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.get('getUserFav');
  };

  const getFAQs = () => api.get('getFAQs');
  const aboutHectar = () => api.get('aboutHectar');
  const roles = () => api.get('roles');

  const addNewUserQuestion = (content, token) => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.post('addUserQuestion', content);
  };

  const checkRealEstateLike = (realEstateId, token) => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.post('realEstate/checkLike', { _id: realEstateId });
  };

  const addToLike = (realEstateId, state, token) => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.post('realEstate/addLike', { _id: realEstateId, state });
  };

  const addShow = (realEstateId, token) => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.post('realEstate/show', { _id: realEstateId });
  };

  const addRating = (realEstateId, stars, reason, token) => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.post('realEstate/rateRealEstate', {
      _id: realEstateId,
      stars,
      reason,
    });
  };

  const addRequest = (realEstateId, request, token) => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.post('realEstate/addRequest', { _id: realEstateId, request });
  };

  const changeRequestState = (_id, status, token) => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.post('realEstate/changeState', { _id, status });
  };

  const getUserRequests = token => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.get('realEstate/userRequests');
  };

  const getUserNotificationStatus = token => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.get('realEstate/userNotificationsState');
  };

  const getUserNotification = token => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.get('realEstate/userNotifications');
  };

  const setUserNotificationStatus = token => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.get('realEstate/setNotificationsState');
  };

  const setOneNotification = (_id, deleteFlag, token) => {
    api.setHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return api.post('realEstate/setNotificationState', {
      _id,
      delete: deleteFlag,
    });
  };

  const suggestionRealEstate = _id => {
    return api.get(`suggestionRealEstate?_id=${_id}`);
  };

  const getRealEstateDetails = _id => {
    return api.get(`realEstate?id=${_id}`);
  };

  const getOffices = (lat, lng, radius) => {
    api.setHeaders({
      'Content-Type': 'application/json',
    });
    return api.get(
      `get-realestate-agents?lat=${lat}&lng=${lng}&radius=${radius}`,
    );
  };
  return {
    // a list of the API functions from step 2
    login,
    checkPhone,
    verifyPhone,
    registerUser,
    userTypes,
    editUser,
    forgetPassword,
    forgetPasswordVerifyPhone,
    resetPassword,

    getRealEstateAddingInfo,

    addRealEstate,
    getRealEstate,
    getUserRealEstate,
    updateRealEstate,
    deletRealEstate,
    addToFav,
    removeFromFav,
    getUserFav,
    getFAQs,
    aboutHectar,
    roles,
    addNewUserQuestion,

    checkRealEstateLike,
    addToLike,
    addShow,
    addRating,
    addRequest,
    changeRequestState,
    getUserRequests,
    refreshRealEstate,

    getUserNotificationStatus,
    getUserNotification,
    setUserNotificationStatus,
    suggestionRealEstate,
    getRealEstateDetails,
    setOneNotification,
    getOffices,
  };
};

// let's return back our create method as the default.
export default {
  create,
  apiURL,
};
