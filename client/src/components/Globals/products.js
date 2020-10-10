import React, { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from './products.query'
import { GET_CATEGORIES } from './category.query'
import { GET_DISTRIBUTORS } from './distributor.query'
import { EDIT_PRODUCT } from './products.mutation'
import { DELETE_PRODUCT } from './products.mutation'
import MaterialTable from 'material-table';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddBox from '@material-ui/icons/AddBox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

  
const Products = () => {
  console.log('render')
  const {data: productsQuery, loading: productsQueryLoading} = useQuery(GET_PRODUCTS)
  const {data: categoriesQuery, loading: categoriesQueryLoading} = useQuery(GET_CATEGORIES)
  const {data: distributorsQuery, loading: distributorsQueryLoading} = useQuery(GET_DISTRIBUTORS)
  
  const [ products, setProducts ] = useState(undefined);
  const [ currentProduct, setCurrentProduct ] = useState('');

  useEffect(() => {
    if(!productsQueryLoading && productsQuery){
      setProducts(JSON.parse(JSON.stringify(productsQuery.products)));
    }
  }, [productsQuery, productsQueryLoading])

  const [isOpen, setIsOpen] = useState(false);
  const handleClick = useCallback(() => setIsOpen(prevIsOpen => !prevIsOpen), []);

  const handleRowDelete = useCallback((oldData, products) => {
    deleteProduct({ 
      variables: { 
        id: parseInt(oldData.id)
      } 
    })

    const dataDelete = [...products];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);
    setProducts([...dataDelete]);
  },[])
  
  const [randomNumber, setRandomNumber] = useState('');
  const generateRandomNumber = useCallback(
    () => setRandomNumber(Math.floor(Math.random() * 9000000000) + 1000000000),
  [],);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  const [editProduct] = useMutation(EDIT_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  if (productsQueryLoading) return 'Loading...'
  if (categoriesQueryLoading) return 'Loading...'
  if (distributorsQueryLoading) return 'Loading...'
 
  let categoriesLookup = categoriesQuery.categories.reduce((obj, item) => (obj[item.id] = item.name, obj) ,{});
  let distributorsLookup = distributorsQuery.distributors.reduce((obj, item) => (obj[item.id] = item.name, obj) ,{});

  return (
    <div >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />     
        <MaterialTable
          title="Global Non-Prepped Products"
          options={{
            paging: false,
            actionsColumnIndex: -1
          }} 
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                    
                    editProduct({ 
                      variables: { 
                        id: parseInt(newData.id), 
                        name: newData.name,
                        distributorId: parseInt(newData.distributor.id),
                        categoryId: parseInt(newData.category.id),
                        caseQuantity: parseInt(newData.caseQuantity),
                        markUp: parseInt(newData.markUp),
                        price: parseFloat(newData.price),
                      }

                    });
                }, 300);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  handleRowDelete(oldData, products)
                }, 100);
              }), 
            }}
            actions={[
              {
                icon: 'add',
                tooltip: 'Add',
                onClick: (event, rowData) => {
                  // event.stopPropagation()
                  handleClick()
                  setCurrentProduct(rowData)
                }
              },
            ]}
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Name', field: 'name' },
            { 
              title: 'Distributor', 
              field: 'distributor.id',
              lookup: distributorsLookup,
            },
            { 
              title: 'Category', 
              field: 'category.id',
              lookup: categoriesLookup,
            },
            { title: 'Case Quantity', field: 'caseQuantity' },
            { title: 'Mark Up', field: 'markUp'},
            { title: 'Price', field: 'price', type: "currency" },
            { title: 'Final Price', field: 'markedUpPrice', editable: 'never', type: "currency" },

          ]}
          data={products}           
        />
      
      <Drawer 
        open={isOpen}
        variant="temporary"
        anchor="right"
        onClose={handleClick}
      > 
      <div>
 
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 align="center">{currentProduct.name}</h3>
        <List >
        
        <ListItem>
          <TextField
              required
              label="Prepped Name"
              name="name"
              inputRef={register}
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
                inputRef={register}
                label="Category"
                name="categoryId"
                placeholder="Select a Category"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                required
                SelectProps={{
                  native: true,
                }}              
              >
              <option key='' value=''></option>
              {
                categoriesQuery.categories.map(category => {
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
                  inputRef={register}
                  required
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
                  inputRef={register}
                  required
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
                // value={randomNumber}
                label="Barcode"
                name="barcode"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}    
                InputProps={{
                  endAdornment: 
                    <InputAdornment>
                      <IconButton style={{ outline: 'none' }} onClick={generateRandomNumber}>
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
        </div>
      </Drawer>        
    </div>
  )
}

export default Products
