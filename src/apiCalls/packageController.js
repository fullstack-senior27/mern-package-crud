import axios from "axios";

/**
 *
 * @desc    create package
 * @route   POST /users/create-package
 * @access  Private
 * @params  package: name, price, description, category, quantity
 * @returns package, msg
 */
export async function createPackage(packag) {
  let res = await axios.post("http://localhost:4000/packages/add", { packag });
  // console.log(res.data)
  return res.data.package;
}

export async function updatePackage(packag) {
  let res = await axios.post("http://localhost:4000/packages/update/" + packag._id, { packag });
  // console.log(res.data)
  return res.data.package;
}

/**
 *
 * @desc    upload img
 * @route   POST /users/upload-img
 * @access  Private
 * @params  img from input file
 * @returns img path, mimetype, filename, msg
 */
export async function uploadImg(file, packag) {
  // Create an object of formData
  const formData = new FormData();

  // Details of the uploaded file
  console.log('uploadImg--', file, packag);

  // Update the formData object
  formData.append("file", file, file.name);

  // Request made to the backend api
  // Send formData object
  // let res = await axios.post("/users/upload-img",
  //     {package: props.package, file, formData})
  let res = await axios.post("http://localhost:4000/packages/upload-img", formData);
  // console.log(res.data)
  let { img } = res.data;
  packag.img = img;
  console.log(packag)
  let response = await axios.post("http://localhost:4000/packages/update/" + packag._id, { packag: packag });
  console.log(response.data)
}