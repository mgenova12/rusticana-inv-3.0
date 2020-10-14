import React from "react";
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import { useMutation } from '@apollo/client';
import { CREATE_PREPPED_PRODUCT } from './products.mutation'

const ProductsDrawer = ({ categories, visible, currentProduct, onClose }) => {
  const [createPreppedProduct] = useMutation(CREATE_PREPPED_PRODUCT);
  
  const { register, handleSubmit, errors, setValue, reset } = useForm({mode: "onBlur"});
  
  const onSubmit = data => {
    createPreppedProduct({ 
      variables: { 
        name: data.name,
        categoryId: parseInt(data.categoryId),
        caseQuantity: parseInt(data.caseQuantity),
        portionSize: parseInt(data.portionSize),
        barcode: parseInt(data.barcode),
        markUp: parseInt(data.markUp),
        daysTillExpire: parseInt(data.daysTillExpire),
        description: data.description,
        pId: parseInt(currentProduct.id),
        price: parseFloat(currentProduct.price)
      }
    });

		reset()
		onClose()
  }

  const generateBarcode = () => {
  	setValue("barcode", Math.floor(Math.random() * 9000000000) + 1000000000)
  }
  return (
    <div>
			<Drawer 
          open={visible}
          variant="temporary"
          keepMounted={true}
          anchor="right"
          onClose={onClose}
      >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 align="center">{currentProduct.name}</h3>
        <List >
        
        <ListItem>
          <TextField
              label="Prepped Name"
              name="name"
              inputRef={register({required: true})}
              error={errors.name ? true : false}
              placeholder="Add Prepped Name"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            /> 
          </ListItem>
          
          <ListItem>
            <TextField
                select
                inputRef={register({required: true})}
                error={errors.categoryId ? true : false}
                label="Category"
                name="categoryId"
                placeholder="Select a Category"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                SelectProps={{
                  native: true,
                }}              
              >
              <option key='' value=''></option>
              {
                categories.map(category => {
                  return <option key={category.id} value={category.id}>{category.name}</option>
                })
              }

              </TextField>
            </ListItem>

            <ListItem>
              <TextField
                  inputRef={register}
                  label="Case Quantity"
                  name="caseQuantity"
                  type="number"
                  placeholder="Leave Blank If Not Case"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />  
            </ListItem> 
            
            <ListItem>
              <TextField
                  inputRef={register({required: true})}
                  error={errors.portionSize ? true : false}
                  type="number"
                  label="Portion Size"
                  name="portionSize"
                  placeholder="Add Portion Size"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                /> 
            </ListItem>
            
            <ListItem>
              <TextField
                  inputRef={register({required: true})}
                  error={errors.markUp ? true : false}
                  label="Mark Up"
                  name="markUp"
                  type="number"
                  placeholder="Add Mark Up"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}  
                  InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                  }}              
                />     
            </ListItem>   
            
            <ListItem>                                                        
              <TextField
                inputRef={register}
                placeholder="Add or Generate Barcode"
                variant="outlined"
                type="number"
                margin="normal"
                label="Barcode"
                name="barcode"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}    
                InputProps={{
                  endAdornment: 
                    <InputAdornment>
                      <IconButton style={{ outline: 'none' }} onClick={() => generateBarcode()}>
                        <AddBox/>
                      </IconButton>
                    </InputAdornment>,
                }}                  
              />   
            </ListItem>
            
            <ListItem>
              <TextField
                  inputRef={register}
                  select
                  label="Days Till Expire"
                  name="daysTillExpire"
                  placeholder="Select a Day Till Expire"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  SelectProps={{
                    native: true,
                  }}              
                >
                <option key='' value=''></option>
                <option key='7' value='7'>7 Days</option>
                <option key='14' value='14'>14 Days</option>
                <option key='30' value='30'>30 Days</option>

              </TextField>
            </ListItem>
            
            <ListItem>
              <TextField
                inputRef={register}
                name="description"
                placeholder="Add Description"
                variant="outlined"
                margin="normal"
                label="Description"
                fullWidth
                multiline={true}
                rows={3}
                rowsMax={5}
                InputLabelProps={{
                  shrink: true,
                }}            
              />  
            </ListItem>
          
          <ListItem>  
           <Button type='submit' variant="contained" color="primary">
                Save Product
           </Button>
          </ListItem>

          </List>
        </form>
      </Drawer> 
    </div>
  );
};

export default ProductsDrawer
