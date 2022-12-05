import { useEffect } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { confirmateToken } from "../../Redux/Slices/Session/sessionActions";

const Confirm = () => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const alert = () => {
        Swal.fire({
            title: "Error!",
            text: "Do you want to continue",
            icon: "error",
            confirmButtonText: "Cool",
        });
    };

    useEffect(() => {
        alert();
        dispatch(confirmateToken(token));
    }, [token, dispatch]);

    return (
        <div className="min-h-screen bg-event flex flex-col items-center justify-center py-20">
            <div>
                <h3 className="text-3xl font-semibold text-white capitalize mb-10 lg:text-4l">
                    Redireccionando...
                </h3>
            </div>
            <div>
                {
                    <img
                        className="h-[600px]"
                        src="https://res.cloudinary.com/ds41xxspf/image/upload/v1669344586/Donde-Suena-Assets/musico_dq7q6v.png"
                        alt="guitarrist "
                    ></img>
                }
            </div>
        </div>
    );
};

export default Confirm;
