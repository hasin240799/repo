import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faSignOutAlt, faUserPlus, faUsers, faPaperPlane, faFileAlt, faTasks, faEnvelope, faChalkboardTeacher, faCalendarAlt, faTable } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

export default function Sidebar() {
  const location = useLocation();
  const role = Cookies.get('role');
  const username = Cookies.get('username');
  const handleLogout = () => {
    // Clear the authentication token
    Cookies.remove('token');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="bg-gray-900 h-screen p-2 pt-8 w-72">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full"
          src={"data:image/png;base64,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"}
          alt="User avatar"
        />
        <div className="mx-3">
          <h4 className="text-gray-300 font-medium">{username}</h4>
          <p className="text-gray-500 text-xs">{role}</p>
        </div>
      </div>

      {/* Common links */}
      <Link to="/dashboard" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/dashboard" ? "bg-gray-700 text-white" : ""}`}>
        <FontAwesomeIcon icon={faChartBar} className="mx-3 text-lg" />
        <span className="text-sm font-semibold">Dashboard</span>
      </Link>

      {/* Links based on user role */}
      {role === 'admin' && (
        <>
          <Link to="/add_lecturer" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/add_lecturer" ? "bg-gray-700 text-white" : ""}`}>
            <FontAwesomeIcon icon={faUserPlus} className="mx-3 text-lg" />
            <span className="text-sm font-semibold">Add Lecturer</span>
          </Link>

          <Link to="/view_lecturers" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/view_lecturers" ? "bg-gray-700 text-white" : ""}`}>
            <FontAwesomeIcon icon={faChalkboardTeacher} className="mx-3 text-lg" />
            <span className="text-sm font-semibold">View All Lecturers</span>
          </Link>

          <Link to="/view_student" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/view_students" ? "bg-gray-700 text-white" : ""}`}>
            <FontAwesomeIcon icon={faUsers} className="mx-3 text-lg" />
            <span className="text-sm font-semibold">View All Students</span>
          </Link>

          <Link to="/view_courses" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/view_courses" ? "bg-gray-700 text-white" : ""}`}>
            <FontAwesomeIcon icon={faChalkboardTeacher} className="mx-3 text-lg" />
            <span className="text-sm font-semibold">View Courses</span>
          </Link>

          <Link to="/messages" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/messages" ? "bg-gray-700 text-white" : ""}`}>
            <FontAwesomeIcon icon={faEnvelope} className="mx-3 text-lg" />
            <span className="text-sm font-semibold">View Messages</span>
          </Link>

          <Link to="/timetables" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/timetables" ? "bg-gray-700 text-white" : ""}`}>
            <FontAwesomeIcon icon={faCalendarAlt} className="mx-3 text-lg" />
            <span className="text-sm font-semibold">View Schedules Lecture</span>
          </Link>
        </>
      )}

      {role === 'user' && (
        <>
          <Link to="/timetables" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/timetables" ? "bg-gray-700 text-white" : ""}`}>
            <FontAwesomeIcon icon={faCalendarAlt} className="mx-3 text-lg" />
            <span className="text-sm font-semibold">View Schedules Lecture</span>
          </Link>
        </>
      )}

      <button onClick={handleLogout} className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white">
        <FontAwesomeIcon icon={faSignOutAlt} className="mx-3 text-lg" />
        <span className="text-sm font-semibold">Logout</span>
      </button>

    </div>
  );
}

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChartBar,faSignOutAlt, faUserPlus, faUsers,faPaperPlane, faFileAlt,faTasks,faEnvelope, faChalkboardTeacher, faCalendarAlt, faTable } from '@fortawesome/free-solid-svg-icons';
// import Cookies from 'js-cookie';

// export default function Sidebar() {
//   const location = useLocation();
//   const role = Cookies.get('role');
//   const username = Cookies.get('username');
//   const handleLogout = () => {
//     // Clear the authentication token
//     Cookies.remove('token'); 
//     // Redirect to login page
//    window.location.href='/login';
//   };

//   return (
//     <div className="bg-gray-900 h-screen p-5 pt-8 w-72">
//       <div className="flex items-center">
//         <img 
//           className="w-10 h-10 rounded-full"
//           src={"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PEA0PEBANDRINDQ0ODQ0NDQ8NDRANIBEWFhUREx8YHSggJBolGxMTITEhJSkrLi46Fx8zODM4NygtLisBCgoKDg0OGBAQGi0gHiUtLSstKy0tLi0tLS0tLS0tLS0tLS0tLi0tLS0tLS0tKy0rLS0tLS0tLSstLTcrLS0tN//AABEIAMgAyAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcCBAUBAwj/xABIEAACAQMABQgGBgUKBwAAAAABAgADBBEFBhIhMQcTIkFRcYGRUmFiobHRFCMyQnLCRFOjweFUc4KDkqKy0tPxFzNDdJPi8P/EABsBAQACAwEBAAAAAAAAAAAAAAAEBQIDBgEH/8QALhEAAgEDAwIEBQUBAQAAAAAAAAECAwQRBSExElETQXGBIjKR0eFCYaGx8PEU/9oADAMBAAIRAxEAPwC8YiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIB4IicTTesltZjFRtpyMrSTpVD4dQ9ZmMpKKy2ZQpym+mKyztAzVvdIUaIzVq06Q7XcLmVhpjXm6r5FPFsnAbG+qe9urwkZq1GclnZnY7yzMxJ8TIdS+itorJdW+h1Jb1H0/tyy1rvXyxTOy9St/N0zjzOJzKvKRT+5bVT62qInwzK5iRpXlR8bFnDRLaK3y/f7Fgf8Sz/JP2//AKz7UuUmn962qj1rURvjiVzExV3VXmbHo9q/L+WWxaa+WL/aapR/naZx5jMkFlpCjXGaVWnUHajhsSh5nSqMhDIzIw3hlZgR4ibYXzXzIiVtBpvenJr13L/BnolS6H15uqOBVP0lOB291UdzdfjJ/oTWW2vB9W+y4HSov0ag8OsesSbTuIT4e5S3OnV6G8lld1wdyJ4J7N5BEREAREQBERAEREAREQDyYO4AJJAxvyTwh2AyTuwMmVZrnrWbktQoMVoqcMw3Gsf8nxmqrVjTjlkq0tJ3M+mPHm+x0tadeclqNoRu6L3P+n8/KQKo5YlmJYk5ZmOSW7SZjEp6laVR5Z2VrZ07eOIL382IicvTuk+YUBcc4/2c/dX0pjSpSqSUVyzbWrRowc5cI6Fe4SmMu6J+JlE1Dpq2/WjwVz+6Quo5YlmJYneWY5MxlvDTI4+JnO1NdqN/BFJfuTqnpW3bhVp9xbHxm0jhuBB/CVMruAcdo7t08lpcfKR7DXpr5op+jLFiQKjf1k+zVqDHVtsR5GdjResLbQWvght3OAYK9/qkarp1SCynknUNZo1JKMk45+hJZlTcqQykqQcqynBB9RmIiV/BbtJon+q2vH2aN2Rv3Jc/6nz85YKMCMjBBGQQeM/P8l2pmthtitCuxNAnCM280T/k+EsLa6/TP6nO6jpKw6lFeq+32LWiYI4IBGDkZBHXM5ZHOCIiAIiIAiIgHmIMTh616XFnbvU3F26NIHrqHh4Dj4TGUlFNsyhBzkox5ZF+ULWPebOi2B+kup/Z/Py7ZAJlUcsSzEsWLMzHiWPFpjKStUdSWWd1Z2sbemoLnzfdiIiaiUPd2nskE0ndc9VqP1E4QdiDh/8AeuSbWS6NOiQNxqtsZ9XX8vGRBRnAGTk4AHXLjTaWIuo/Q5rXLnMo0l5bs8iWdqtyfUlVat6DUdhtC32sU6fsvj7R9XAeuSS61S0dUABtKK44NSDUXHimJJnfU4yxyVMLSco5exRsE9w75ca8n2jQc83WPsm4fE61hq9ZW/8Ayragh9M01qP5vkzGWoQxsmeqylndlDA+PdEuzWTVO3vKbYp06NYD6quiKh2+oPjiDKWrUmRmRgVZGZHU9RDYIm+hcRqp45Rpq0ZUms8Ew1duDUoLneUJp59Q4e4zpTkarLih+Kq5+AnXnP3KSqyS7na2MnK3g3zhCIiaSWT/AJPdY94s6zZH6M5P7P5eUsSfn6m5UhlJBUqysOIYcDLl1V0uLy3SpuDr0KwHVUHHwPHxlpaVupdL5RymsWSpy8WC2fPr+TuxEScUgiIgCIiAYmVNyhaU566NIHKWo2MdRqHezeG4eEs/Sd2KNGrVPClTd+/AlFVahdmdiSzsXYnrJ3mQb6piKj3LzQ7fqqSqP9PHqzCIiVZ1QiIgEe1vG6h+Kr57In05N7Ba1/TLAEW9N6+D6YwE95z4TZ1jtWq0hsKXZKikKgyTnccCbfJTTK175yrnmrdUKBentGr9nHb0Jc29Rf8AlaXKycpqVJq9y+Hh/wAfgtCJDtIXGn6hJoUbW1T7qPUpVK2PbJyM9090RpTTK1adK6s0qo7qrV6RRObHW5IJGB3CRPAeM5X1PPFWcYf0JhESO6yaS0lTdaVlZittJtG5ZlNNT2YyMEeszXCDk8I2SkorLJFKa5R7PmtIViBgV0pVt3pEYPvBkutn1jUhmSzqDiaTtQTPihyPOcvlJtatWja3j0Xt3plre4psyvs53oQw3FM5wfXJ1tHw6i3Tz2ZDuX1wezWDlaq1c0WXrSq2e47/AJzsziaq2zqlR2VlFRk2CysAwA4jtG+duQLtLxpYOn01t20M9hERIxNElPJ7pTmLoUicJcjZweqoN6n4jxkWmdKoUZXXcyMHUjqIORNlKbjNNGi6oqtSlB+f+Rf4M9mnoy7FajSqjhVpo49WRNyXqeVk4FpptM9iInp4IiIBFOUa52LF1/XVKdPwzk/4ZU0sblVqfV2idtWox8Ex+aVzKi8lmpjsdfokFG2z3b+wiIkQtxERAOhoQfW/hRyJnqVUVL7TNDcCaqVl7Su/Pvcec+Wh2xWX2gy+7+E4q6Q+iadZ2OEqulKqfYeknS8Dg+Em2icoyS7FDqu1SDf+5JNrraaQ5k1bavWZvpCotraJsFLbZPTJ+075xnBAHZOpqjb3C2dB7qrVatUD85RrBTUpjbOwdrcRkY6Jye7hO1PJ663wdPSiAqXxdXUxPncW5qKyiqaB2SVZVUknG4AnIXJ6yDifSJqi+l5Nso9Sxkr7U600vUqXBuK95bc3S2qRuU52jUuNsfVlTvIIzvUjHHM7HKRc83o2sGxtVmo0hjht7WSRn8BkplZ8qukdutbWinPNDnaoH619yL5ZP9OS6cvFqJ4Sx2I04+FB75ydzSNEJbW6j/prSRf/ABTkTt6ebCU09rOO4YnElbN5k2dNYrFFCIiYksREQC2eTm65yyRf1NSpT8NrI+MlQkB5Kqn1d2vo1abDxQj8snol5by6qcWcLqEFC5nFd/73MoiJuIYiIgFd8q/6F/X/AJJX8sXlVp5p2jdlWop8Uz+WV1Ka7WKrOz0d5tY+/wDYiIkYsxERAMqbFSGG4qciRbXaoKl2zgEbdGiSD6QXB+Ek8jWttLpUn7VKE+0Dn95k7T5Yqpdyp1mmpW/V5plmajaUe6saNSocuhek7H72xuDnwxmfd9bdGqSDeW+QcHDMR5gYkP0NpihT0HcU0qIKy07hGplsVNuo+AQOsYPV2Ta1H1YtvotG5rqGa4yys9Ja4o0trCYU7t+Mk8d4kidGKcnLZZwijhVk1FR3eMs77a32C9E3tmxb7BBfYH4yMzMa3aOGA15bE9ZQuUz5TZTV2ywcXNqA3FTaIPdOdpXVGyro9JCjvsnYr07ZaHNnq3j7W/qmpU6ed8peqNvXN8c+jR2zf0zQa4pslVFpPVVkbIYKpPHwxKLW6e5ulrVSWatcUnqHvcdEdw3eEm+oWlqFCyv6VzUSmKVV+i7bztUsEIOJ3g8O2QrV+jtXFH2TtnwX/aSqNNUlN9vP2I7k606ce749ywNJXfPOWGQo3KDx2ZqREpDs4RUYqK4QiIgyEREAsHko43v9R+eWFIDyVU8Jdt6VWmo8EJ/NJ9Lq2WKUTidUebqft/SPYiJIK8REQCJ8ottt2Ttx5mrTqeGcH/FKnl76TtFr0a1I8KtN0PqyJRdWmUZkbIZGKMD1EHBlXfQw1I6fQauacqb5Tz9TCIiQS/EREAT4XtqlZCjjIPAjirekJ94nsZOLyuTGcIzi4yWUyD6S0XUt26XSUnoVANx+Rlocn2nqFW1oWzOiVrdOaNJ2VS6A7nTPHdOZb0w7BWAZW2gysMgrs9YnJ0vqYrZe2YIePMuehn2D1eMtI3Ea8VGo8PuczdWbtanVS3T8iTac1st7W8FqaAcZoirWFXYFMsd+RjqGDxkg0tpm2saZeo6LgZp01ZTUqHqVBxOe3hKUraFulbZahWLE9SM4PiN07WitTqrkNcNzQ9BDt1ivok8B75snQoxSbl+SJGtWk2un8Efp0alxUbYXLO5dscFy2Tk9Qks0RotbdTwZ2HTb9w9U61axpUAiUkCLhs44lu0nrM+MiXV26nwx2iXem6dClFVZbyf8egiIkEuBERAERM6VMuyou9nYIo7STgQtxJpLLLW5Obbm7JW4c9UqVPDOB8JKhNPRloKNGlSHClSRB68Cbgl/Tj0xSPn1xU8SrKfds9iImZqEREAxIlTcoWizRujVAwlyNvPUKg3MPgfGW1OJrXogXls9PcHXp0ieqoOHgeHjNFxT64NLknafc+BXUnw9n6FLxMqiFSVYFSpKsp4gjcRMZSHcJ53QiIgCJ6q5IAySeAAyTOpR0BXKrUdTSQtgF/tn+j85lGEmspGqdenT+aWD56Eo7VRmIyFX+8Z1KttjJXf6uufa2t1pqFXd1kniT2mfWZRWEVNep4k8o5nu9UTpOgPEAz5/Rk7D5z01ZONpGmSobf0TvPZmc2S401IK4BBGCvbOfU1ZqsjVaOHVWwUY4fw6jPOiUnsibb3cIRxUeDgxPpXoPTOy6sjDirKwM+c1tY5LJSTWUIiIPRJTye6LNa6FUjKWo28ngah3KPifCRimhYhVBYsVVVHEk8FlzaqaIFnbpT3F26dYjrqHj4Dh4SVaUuqeXwip1e7VKj0L5nt7eZ2xPYiXBx4iIgCIiAIiIBXXKFq3jN5RX/uEUftPn59sh1hom4uBmlSdx6WMJ5ndLxdQdxwQRgg8CJz69oEA2AAoGAqjAUeodkiTs4zlnOC2t9Yq0aPRjLXDfYra21KumxttRpd784fIfOdiz1HoLg1alWr7K7NJP3n3yVRN0LOlHyz6kerrFzP9WPQ1bHRlChupUkp+0q9PzO+eXNuHWpSOBt7T027G/wB/jNuY1F2h2YOVYcQZv6I9PTjYgOrNy6m8shlWmUYqwIIOCDMJKb2yStgP0KgHRdeB+Y9XGcW40TWTPR2x6Sb/AHcZU1bWUHlLKLqheQqL4nhmhE+v0ap6D/2Gm1b6JrPjo7AP3n3e7jNMaU5PCRIlWgllyRp0aZdgqgkk4AkrtrYItOkN+z06h7W/ifcJ8rOzSjkJ06hGGc9XyHq4mbtNNkdZJOWY9ZlpbW/hrL5KW7ulVeI8IwubanVXZqIlUdjqpnBvdTLV8lDUoH2G208j85I4m+dGEuVk1UrqtS+STRAbrUeuuebqUqvYH2qZ/eJybzV67ogl6LlRxZCtQDylqTatbbOGO4DgO2RZ2NJ7rYtKWuXMXiWJEL5PdWySLysuP5OjD9p8vPsliQMCJtpUlTjhEC5uZ3FRzl/wyiImw0CIiAIiIAiIgCeET2IBoXNp1r/Z+U0iPCdufKtQVuPmOMyUu5g4nJibNWzYcOl3cZrkY7R3zJPJi1gxZARg4PqMw2CODHucbf8AGfSJkeGH1nank3znnNk8WPco2P4z6RPAeIgAwAB6hPYnoHee6AeQB4zZpWbHj0e/jN2lQVeG89p4zxyRkotmtbWfW3gvzm8BPYmtvJmlgREQeiIiAIiIAiIgCIiAIiIAiIgCYOgPEA94mcQDWayQ9o7jPmbAekR4Tcie5Z5hGl9A9r+7PRYD0ifCbkRljpRrrZIO095n2RAvAAdwmcTwYEREHoiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAf//Z"} 
//           alt="User avatar" 
//         />
//         <div className="mx-3">
//           <h4 className="text-gray-300 font-medium">{username}</h4>
//           <p className="text-gray-500 text-xs">{role}</p>
//         </div>
//       </div>
      
//       {/* Common links */}
      

//       {/* Links based on user role */}
//       {role === 'admin' && (
//         <>

//         <Link to="/dashboard" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/" ? "bg-gray-700 text-white" : ""}`}>
//           <FontAwesomeIcon icon={faChartBar} className="mx-3 text-lg" />
//           <span className="text-sm font-semibold">Dashboard</span>
//         </Link>

//         <Link to="/add_lecturer" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/add_lecturer" ? "bg-gray-700 text-white" : ""}`}>
//           <FontAwesomeIcon icon={faUserPlus} className="mx-3 text-lg" />
//           <span className="text-sm font-semibold">Add Lecturer</span>
//         </Link>

//         <Link to="/view_lecturers" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/view_lecturers" ? "bg-gray-700 text-white" : ""}`}>
//           <FontAwesomeIcon icon={faChalkboardTeacher} className="mx-3 text-lg" />
//           <span className="text-sm font-semibold">View All Lecturers</span>
//         </Link>

//         <Link to="/view_student" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/view_students" ? "bg-gray-700 text-white" : ""}`}>
//           <FontAwesomeIcon icon={faUsers} className="mx-3 text-lg" />
//           <span className="text-sm font-semibold">View All Students</span>
//         </Link>

//         <Link to="/view_courses" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/view_courses" ? "bg-gray-700 text-white" : ""}`}>
//           <FontAwesomeIcon icon={faChalkboardTeacher} className="mx-3 text-lg" />
//           <span className="text-sm font-semibold">View Courses</span>
//         </Link>

//         <Link to="/messages" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/messages" ? "bg-gray-700 text-white" : ""}`}>
//           <FontAwesomeIcon icon={faEnvelope} className="mx-3 text-lg" />
//           <span className="text-sm font-semibold">View Messages</span>
//         </Link>

//         <Link to="/timetable" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/timetables" ? "bg-gray-700 text-white" : ""}`}>
//           <FontAwesomeIcon icon={faCalendarAlt} className="mx-3 text-lg" />
//           <span className="text-sm font-semibold">View Schedules Lecture</span>
//         </Link>

//         <button onClick={handleLogout} className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white">
//           <FontAwesomeIcon icon={faSignOutAlt} className="mx-3 text-lg" />
//           <span className="text-sm font-semibold">Logout</span>
//         </button>


//         </>
//       )}

     
//       {role === 'user' && (
//         <>
//         <Link to="/timetable" className={`flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white ${location.pathname === "/message" ? "bg-gray-700 text-white" : ""}`}>
//         <FontAwesomeIcon icon={faCalendarAlt} className="mx-3 text-lg" />
//         <span className="text-sm font-semibold">View Schedules Lecture </span>
//         </Link>


       
     

//         <button onClick={handleLogout} className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white">
//         <FontAwesomeIcon icon={faSignOutAlt} className="mx-3 text-lg" />
//         <span className="text-sm font-semibold">Logout</span>
//       </button>
     
//         </>
//       )}
//     </div>
//   );
// }

