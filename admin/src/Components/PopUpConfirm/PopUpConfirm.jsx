import './PopUpConfirm.css'

function PopUpConfirm({handleDelResult}) {
return (
<div className='pop-up-confirm'>

    <div className='dialogue-box'>
        <p>You are trying to delete this item. Item deletion can not be reversed.</p>
        <p>Do you wish to continue ?</p>
        <p>Note: If you are deleting a category, all items under the category will also be deleted</p>
        <button 
            className='no' 
            onClick={() => handleDelResult(false)}>
                Cancel </button>
        <button 
            className='yes'
            onClick={() => handleDelResult(true)}>
                Delete </button>
    </div>

</div>
)}

export default PopUpConfirm
