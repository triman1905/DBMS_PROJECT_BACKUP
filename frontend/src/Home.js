// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";

// const Home = () => {
//   const [inputUser, setInputUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChnage = (event) => {
//     setInputUser({
//       ...inputUser,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // console.log(inputUser);
//     const res = await axios.post("http://localhost:5000/createuser", inputUser);
//     console.log(res);
//     fetchAllUser();
//   };

//   // data fetching all
//   const [userData, setUserData] = useState([]);
//   const fetchAllUser = async () => {
//     const res = await axios.get("http://localhost:5000/readalluser");
//     console.log(res);
//     setUserData(res.data);
//   };
//   useEffect(() => {
//     fetchAllUser();
//   }, []);

//   const handleDelete = async (id) => {
//     const res = await axios.delete(`http://localhost:5000/delete/${id}`);
//     if (res.status === 200) {
//       fetchAllUser();
//     }
//   };
//   return (
//     <div className="w-2/3 mx-auto mt-5">
//       {/* creating form */}
//       <form onSubmit={handleSubmit}>
//         <h1>Create User</h1>
//         <div className="">
//           <label className=" text-sm text-gray-500 ">Name</label>
//           <input
//             type="text"
//             name="name"
//             className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
//             placeholder="Enter name"
//             required
//             value={inputUser.name}
//             onChange={handleChnage}
//           />
//         </div>
//         <div className="">
//           <label className=" text-sm text-gray-500 ">Email</label>
//           <input
//             type="text"
//             name="email"
//             className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
//             placeholder="Enter email "
//             required
//             value={inputUser.email}
//             onChange={handleChnage}
//           />
//         </div>
//         <div className="">
//           <label className=" text-sm text-gray-500 ">Password</label>
//           <input
//             type="password"
//             name="password"
//             className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
//             placeholder="Enter Password "
//             required
//             value={inputUser.password}
//             onChange={handleChnage}
//           />
//         </div>

//         <div className="flex justify-center my-4">
//           <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
//             Add User
//           </button>
//         </div>
//       </form>

//       <div className="relative overflow-x-auto shadow-md">
//         <table className="w-full text-lg text-center text-gray-500 ">
//           <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 SN.
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Name
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Email
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Password
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {userData.map((item, i) => (
//               <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
//                 <th
//                   scope="row"
//                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                 >
//                   {i + 1}
//                 </th>
//                 <th
//                   scope="row"
//                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                 >
//                   {item?.name}
//                 </th>
//                 <td className="px-6 py-4"> {item?.email}</td>
//                 <td className="px-6 py-4"> {item?.password}</td>
//                 <td className="px-6 py-4">
//                   <div className="flex gap-x-4 justify-center">
//                     <NavLink
//                       to={`/readuser/${item._id}`}
//                       className="font-medium text-green-600 dark:text-blue-500 hover:underline"
//                     >
//                       Read
//                     </NavLink>
//                     <NavLink
//                       to={`/updateuser/${item._id}`}
//                       className="font-medium text-yellow-400 dark:text-blue-500 hover:underline"
//                     >
//                       Edit
//                     </NavLink>
//                     <button
//                       onClick={() => handleDelete(item._id)}
//                       className="font-medium text-red-500  hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Home;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userData, setUserData] = useState([]);

  const handleChange = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post("http://localhost:5000/createuser", inputUser);
    console.log(res);
    setInputUser({ name: "", email: "", password: "" }); // reset form
    fetchAllUser();
  };

  const fetchAllUser = async () => {
    const res = await axios.get("http://localhost:5000/readalluser");
    setUserData(res.data);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/delete/${id}`);
    if (res.status === 200) fetchAllUser();
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  return (
    <div className="w-full px-4 md:w-2/3 mx-auto mt-10 text-gray-800">
      {/* Form Section */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-2xl font-bold text-center text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          CRUD Application
        </motion.h1>

        {["name", "email", "password"].map((field) => (
          <div key={field}>
            <label className="block text-sm text-gray-600 capitalize mb-1">{field}</label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
              placeholder={`Enter ${field}`}
              value={inputUser[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="flex justify-center">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="px-6 py-2 bg-yellow-400 text-white font-semibold rounded-md shadow hover:bg-yellow-500 transition-all"
          >
            Add User
          </motion.button>
        </div>
      </motion.form>

      {/* User Table Section */}
      <motion.div
        className="mt-10 overflow-x-auto shadow-md rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <table className="w-full text-sm text-center text-gray-600 bg-white rounded-lg overflow-hidden">
          <thead className="text-md text-white bg-gray-700 uppercase">
            <tr>
              {["SN.", "Name", "Email", "Password", "Actions"].map((head) => (
                <th key={head} className="px-6 py-3">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userData.map((item, i) => (
              <motion.tr
                key={item._id}
                className="bg-gray-50 border-b hover:bg-yellow-100 transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <td className="px-6 py-4 font-medium">{i + 1}</td>
                <td className="px-6 py-4">{item?.name}</td>
                <td className="px-6 py-4">{item?.email}</td>
                <td className="px-6 py-4">{item?.password}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-x-4 text-sm">
                    <NavLink to={`/readuser/${item._id}`} className="text-green-600 hover:underline">
                      Read
                    </NavLink>
                    <NavLink to={`/updateuser/${item._id}`} className="text-yellow-500 hover:underline">
                      Edit
                    </NavLink>
                    <motion.button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:underline"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Delete
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Home;

