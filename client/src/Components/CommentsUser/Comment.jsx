import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";


export const Comment = ({comments , replies ,currentUserId , eliminateComment ,addComment, activeComment ,setActiveComment , parentId=null, modifyComment,idposts}) =>{
 //en el caso de que el usuario no este logeado , su user id es null , por lo tanto solo puede responder si esta logeado
 const user = useSelector((state) => state.sessionState?.user)
 const artists=useSelector((state)=>state.sessionState?.artists)
 const isEditing =
    activeComment &&
    activeComment.id === comments.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comments.id &&
    activeComment.type === "replying";
  const canReply = Boolean (currentUserId)
  const canEdit =currentUserId ===comments.userId
  const canDelete = currentUserId===comments.userId
  //la variable createdAt me permite que se pueda ver la fecha de "una Manera mas amistosa"
  const createdAt = new Date(comments.createdAt).toLocaleDateString();


 const replyId = parentId? parentId : comments.id;


 return (
  <section   className ="flex items-center justify-center  antialiased bg-white  min-w-screen ml-14 " >

    <div className="container  ml-14 sm:px-5 ">
<div className="bg-slate-900 text-slate-100 mt-10 px-5 py-3.5 rounded-lg shadow hover:shadow-xl max-w-sm mx-auto transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear">
  <div className="flex items-center mt-2 rounded-lg py-1 cursor-pointer">

  <img className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full" alt="Noob master's avatar"
                    src="https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80"/>
  <div className="flex-col mt-1">
  <div className="flex items-center flex-1 px-4 font-bold leading-tight">  {comments.username}
                        <span className="ml-2 text-xs font-normal text-gray-500">{createdAt}</span>
                        </div>
                        {  !isEditing &&  <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
      {comments.body}
      </div>}

      {isEditing && (
        <CommentForm
        submitLabel="Update"
        hasCancelButton
        initialText={comments.body}
        handleSubmit={(text)=>modifyComment(text,comments.id)}
        handleCancel={()=>setActiveComment(null)}
        idposts={idposts}
        />
        )}
  </div>
  </div>
</div>
<div className="comment-right part">
  <div className="comment-content">
    <div className="comment-Author">
      {comments.username}
      <div>{createdAt}</div>
    </div>
  {  !isEditing &&  <div className="comment-text">
      {comments.body}
      </div>}
      {isEditing && (
        <CommentForm
        submitLabel="Update"
        hasCancelButton
        initialText={comments.body}
        handleSubmit={(text)=>modifyComment(text,comments.id)}
        handleCancel={()=>setActiveComment(null)}
        idposts={idposts}
        />
        )}
      <div className="comments-actions-buttons flex items-stretch">
       {canReply
       &&
       <button className="comments-actions-buttons ml-7 mr-2 text-sm font-medium leading-loose text-gray-600"
       onClick={()=>
        setActiveComment({ id:comments.id ,type:"replying"})}
        >
          <div className="flex flex-row">
          <img src="https://res.cloudinary.com/ds41xxspf/image/upload/v1669243828/Donde-Suena-Assets/icons8-response-30_bgrxrb.png" alt="respondericon" width="20px"/>
             Responder

          </div>
        </button>}
        {canEdit   &&
        <button className=" ml-3 mr-6 text-sm font-medium leading-loose text-gray-600"
        onClick={()=>
          setActiveComment({ id:comments.id ,type:"editing"})}
          >
            <div className="flex flex-row">
<img src="https://res.cloudinary.com/ds41xxspf/image/upload/v1669243828/Donde-Suena-Assets/icons8-pencil-30_ufpgqp.png" alt="editarIcono" width="20px"/>
          Editar
            </div>
          </button>}
      { canDelete &&
      <button
      className=" ml-3 mr-6 text-sm font-medium leading-loose text-gray-600"
      onClick={()=> eliminateComment (comments.id)}
      >
        <div className="flex flex-row">
<img src="https://res.cloudinary.com/ds41xxspf/image/upload/v1669243828/Donde-Suena-Assets/icons8-trash-can-30_ygzque.png" alt="eliminarIcono" width="20px"/>
          Eliminar
            </div>
      </button>}
      </div>
    </div>
{/* los replies vienen en forma de array , luego hago recursividad para llamar al comentario de ese reply  */}
    {isReplying && (
      <CommentForm
      submitLabel="Contestar"
      handleSubmit={(text)=> addComment (text, replyId)}

      />


      )}

    {replies.length > 0  && (
      <div className="replies">
      {replies.map(reply =>(
        <Comment
        comment={reply}
        key={reply.id}
        replies={[]}
          currentUserId={currentUserId}
          addComment={addComment}
          eliminateComment={eliminateComment}
          activeComment={activeComment}
          setActiveComment={setActiveComment}
          modifyComment={modifyComment}
          // no es parent id por que es cuando creo una respuesta crea form de comments de vuelta
          parentId={comments.id}
          idposts={idposts}
          />
          // replies lo seteamos como un array vacio ya que las respuestas no pueden anidar otra respuestas , por tema de rendimiento a gran escala , recordar que tenemos que pasarle el current user id por que en cada respuesta hay que otorgar la misma info en que adentro de nuestro comentario

          ))}
      </div>
    )}
  </div>
</div>


    </section>
  )
}
export default Comment
