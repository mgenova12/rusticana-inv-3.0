import React, { useCallback, useState } from "react";
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { useForm } from "react-hook-form";
import { useMutation } from '@apollo/client';
import InputAdornment from '@material-ui/core/InputAdornment';
import NumberFormat from 'react-number-format'
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import { CREATE_PRODUCT } from './globals.mutation'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

const NewProductDrawer = ({ visible, onClose, distributors, categories, productsRetch, containers }) => {
  const [createProduct] = useMutation(CREATE_PRODUCT);
  
  const { register, handleSubmit, errors, setValue, reset } = useForm({mode: "onBlur"});

  const [isOpen, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  
  const onSubmit = data => {
    var price = Number(data.price.replace(/[^0-9.-]+/g,""));

    createProduct({ 
      variables: { 
        name: data.name,
        distributorId: parseInt(data.distributorId),
        categoryId: parseInt(data.categoryId),
        caseQuantity: parseInt(data.caseQuantity),
        markUp: parseInt(data.markUp),
        price: price,
        brand: data.brand,
        unitSize: data.unitSize,
        distributorNumber: data.distributorNumber,
        barcode: parseInt(data.barcode),
        aisleNumber: parseInt(data.aisleNumber),
        description: data.description,
        containerId: parseInt(data.containerId)
      }
    });
    handleOpen()
    productsRetch()
		reset()
		onClose()
  }

  const generateBarcode = () => {
    setValue("barcode", Math.floor(Math.random() * 9000000000) + 1000000000)
  }

  return (
    <div>
      <Snackbar 
        open={isOpen} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}        
      >
        <Alert onClose={handleClose} severity="success">
          Product has been saved!
        </Alert>
      </Snackbar>

			<Drawer 
        open={visible}
        variant="temporary"
        keepMounted={true}
        anchor="right"
        onClose={onClose}
      >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 align="center">Add New Product</h3>
        <List >
        
        <ListItem>
          <TextField
              label="Product Name"
              name="name"
              inputRef={register({required: true})}
              error={errors.name ? true : false}
              placeholder="Add Product Name"
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
                label="Distributor"
                name="distributorId"
                placeholder="Select a Distributor"
                inputRef={register({required: true})}
                error={errors.name ? true : false}                
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
                distributors.map(distributor => {
                  return <option key={distributor.id} value={distributor.id}>{distributor.name}</option>
                })
              }              
              </TextField>  
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
                  select
                  inputRef={register({required: true})}
                  error={errors.containerId ? true : false}
                  label="Container"
                  name="containerId"
                  placeholder="Select a Container"
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
                  containers.map(container => {
                    return <option key={container.id} value={container.id}>{container.name}</option>
                  })
                }

                </TextField>
              </ListItem>              

              <ListItem>
                <TextField
                    label="Case Quantity"
                    inputRef={register}
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
                    error={errors.name ? true : false}   
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
                  inputRef={register({required: true})}
                  error={errors.name ? true : false}   
                  label="Price"
                  variant="outlined"
                  placeholder="Add Price"
                  fullWidth
                  name="price"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />                  
              </ListItem>

              <ListItem>
                <TextField
                  inputRef={register}
                  placeholder="Add Brand"
                  name="brand"
                  variant="outlined"
                  margin="normal"
                  label="Brand"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </ListItem>

              <ListItem>
                <TextField
                  inputRef={register}
                  placeholder="Add Unit Size"
                  variant="outlined"
                  name="unitSize"
                  margin="normal"
                  label="Unit Size"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}            
                />              
              </ListItem>

              <ListItem>
                <TextField
                  inputRef={register}
                  placeholder="Add Distributor ID Number"
                  variant="outlined"
                  margin="normal"
                  label="Distributor Number"
                  fullWidth
                  name="distributorNumber"
                  InputLabelProps={{
                    shrink: true,
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
                    label="Jetro Aisle Number"
                    name="aisleNumber"
                    placeholder="Select a Aisle Number"
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
                  {Array.from(Array(20), (e, i) => {
                    return <option key={i} value={i}>{i}</option>
                  })}
                </TextField>  
              </ListItem>

              <ListItem>
                <TextField
                  inputRef={register}
                  placeholder="Add Description"
                  variant="outlined"
                  margin="normal"
                  label="Description"
                  name="description"
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

export default NewProductDrawer
