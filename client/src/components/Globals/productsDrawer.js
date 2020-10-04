// import React from 'react';
// import Drawer from '@material-ui/core/Drawer';
// import TextField from '@material-ui/core/TextField';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import IconButton from '@material-ui/core/IconButton';
// import AddBox from '@material-ui/icons/AddBox';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import Button from '@material-ui/core/Button';
// import { useForm } from "react-hook-form";


// export const ProductsDrawer = () => {
//   const { register, handleSubmit, errors } = useForm();
//   const onSubmit = data => console.log(data);

//   return (
//     <div>
// 			<Drawer 
//           open={value}
//           variant="temporary"
//           keepMounted={true}
//           anchor="right"
//       >
//       <div style={{width:'600px'}}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <h3 align="center"></h3>
//         <List >
        
//         <ListItem>
//           <TextField
//               required
//               label="Prepped Name"
//               name="name"
//               inputRef={register}
//               placeholder="Add Prepped Name"
//               fullWidth
//               margin="normal"
//               variant="outlined"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             /> 
//           </ListItem>
          
//           <ListItem>
//             <TextField
//                 select
//                 inputRef={register}
//                 label="Category"
//                 name="categoryId"
//                 placeholder="Select a Category"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 required
//                 SelectProps={{
//                   native: true,
//                 }}              
//               >
//               <option key='' value=''></option>
//               {
//                 this.props.categories.data.categories.map(category => {
//                   return <option key={category.id} value={category.id}>{category.name}</option>
//                 })
//               }

//               </TextField>
//             </ListItem>

//             <ListItem>
//               <TextField
//                   inputRef={register}
//                   label="Case Quantity"
//                   name="caseQuantity"
//                   type="number"
//                   placeholder="Leave Blank If Not Case"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />  
//             </ListItem> 
            
//             <ListItem>
//               <TextField
//                   inputRef={register}
//                   required
//                   type="number"
//                   label="Portion Size"
//                   name="portionSize"
//                   placeholder="Add Portion Size"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 /> 
//             </ListItem>
            
//             <ListItem>
//               <TextField
//                   inputRef={register}
//                   required
//                   label="Mark Up"
//                   name="markUp"
//                   type="number"
//                   placeholder="Add Mark Up"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   InputLabelProps={{
//                     shrink: true,
//                   }}  
//                   InputProps={{
//                     startAdornment: <InputAdornment position="start">%</InputAdornment>,
//                   }}              
//                 />     
//             </ListItem>   
            
//             <ListItem>                                                        
//               <TextField
//                 inputRef={register}
//                 placeholder="Add or Generate Barcode"
//                 variant="outlined"
//                 type="number"
//                 margin="normal"
//                 label="Barcode"
//                 name="barcode"
//                 fullWidth
//                 InputLabelProps={{
//                   shrink: true,
//                 }}    
//                 InputProps={{
//                   endAdornment: 
//                     <InputAdornment>
//                       <IconButton style={{ outline: 'none' }} onClick={() => generateBarcode()}>
//                         <AddBox/>
//                       </IconButton>
//                     </InputAdornment>,
//                 }}                  
//               />   
//             </ListItem>
            
//             <ListItem>
//               <TextField
//                   inputRef={register}
//                   select
//                   label="Days Till Expire"
//                   name="daysTillExpire"
//                   placeholder="Select a Day Till Expire"
//                   fullWidth
//                   margin="normal"
//                   variant="outlined"
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                   SelectProps={{
//                     native: true,
//                   }}              
//                 >
//                 <option key='' value=''></option>
//                 <option key='7' value='7'>7 Days</option>
//                 <option key='14' value='14'>14 Days</option>
//                 <option key='30' value='30'>30 Days</option>

//               </TextField>
//             </ListItem>
            
//             <ListItem>
//               <TextField
//                 inputRef={register}
//                 name="description"
//                 placeholder="Add Description"
//                 variant="outlined"
//                 margin="normal"
//                 label="Description"
//                 fullWidth
//                 multiline={true}
//                 rows={3}
//                 rowsMax={5}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}            
//               />  
//             </ListItem>
          
//           <ListItem>  
//            <Button type='submit' variant="contained" color="primary">
//                 Save Product
//            </Button>
//           </ListItem>

//           </List>
//         </form>
//         </div>
//       </Drawer> 
//     </div>
//   );
// };
