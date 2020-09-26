import React from 'react'
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
  const [state, setState] = React.useState({
    open: false,
    selectedProduct:[],
    
    prepped: true,
    name: '',
    category: '',
    caseQuantity: '',
    portionSize: '',
    markUp: '',
    barcode: '',
    description: '',
    daysTillExpire: ''    
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, 'open': open });
  };

  const handleChange = () => (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };  



  const generateBarcode = () => {
    let barcode = Math.floor(Math.random() * 9000000000) + 1000000000;
    setState({ ...state, 'barcode': barcode });
  }  


  const products = useQuery(GET_PRODUCTS)
  const categories = useQuery(GET_CATEGORIES)
  const distributors = useQuery(GET_DISTRIBUTORS)
  
  const [editProduct] = useMutation(EDIT_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  if (products.loading)  {
    return <h2>loading...</h2>
  }
  if (categories.loading)  {
    return <h2>loading...</h2>
  }
  if (distributors.loading)  {
    return <h2>loading...</h2>
  }  
  let categoriesLookup = categories.data.categories.reduce((obj, item) => (obj[item.id] = item.name, obj) ,{});
  let distributorsLookup = distributors.data.distributors.reduce((obj, item) => (obj[item.id] = item.name, obj) ,{});

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
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                    deleteProduct({ 
                      variables: { 
                        id: parseInt(oldData.id)
                      } 
                    }).then(() => products.refetch());
                }, 300);
              }), 
            }}
            actions={[
              {
                icon: 'add',
                tooltip: 'Add',
                onClick: (event, rowData) => {
                  // event.stopPropagation()
                  setState({ ...state, 'open': true, 'selectedProduct':rowData});
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
          data={JSON.parse(JSON.stringify(products.data)).products}           
        />
      
      <Drawer 
          open={state['open']}
          onClose={toggleDrawer(false)}
          variant="temporary"
          keepMounted={true}
          anchor="right"
      >
      <div style={{width:'600px'}}>
      <form >
        <h3 align="center">{state['selectedProduct'].name}</h3>
        <List >
        
        <ListItem>
          <TextField
              required
              label="Prepped Name"
              value={state['name']}
              onChange={handleChange()}
              name="name"
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
                label="Category"
                name="category"
                value={state['category']}
                placeholder="Select a Category"
                fullWidth
                onChange={handleChange()}
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
                categories.data.categories.map(category => {
                  return <option key={category.id} value={category.id}>{category.name}</option>
                })
              }

              </TextField>
            </ListItem>

            <ListItem>
              <TextField
                  label="Case Quantity"
                  name="caseQuantity"
                  value={state['caseQuantity']}
                  type="number"
                  placeholder="Leave Blank If Not Case"
                  fullWidth
                  onChange={handleChange()}
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />  
            </ListItem> 
            
            <ListItem>
              <TextField
                  required
                  type="number"
                  label="Portion Size"
                  value={state['portionSize']}
                  onChange={handleChange()}
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
                  required
                  label="Mark Up"
                  name="markUp"
                  type="number"
                  value={state['markUp']}
                  placeholder="Add Mark Up"
                  fullWidth
                  onChange={handleChange()}
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
                placeholder="Add or Generate Barcode"
                variant="outlined"
                type="number"
                margin="normal"
                label="Barcode"
                fullWidth
                value={state['barcode']}
                onChange={handleChange()}
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
                  select
                  label="Days Till Expire"
                  name="daysTillExpire"
                  value={state['daysTillExpire']}
                  placeholder="Select a Day Till Expire"
                  fullWidth
                  onChange={handleChange()}
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
                placeholder="Add Description"
                variant="outlined"
                margin="normal"
                label="Description"
                fullWidth
                value={state['description']}
                onChange={handleChange()}
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
