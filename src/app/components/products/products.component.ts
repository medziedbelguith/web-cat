import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { Product } from "src/app//model/product.model";
import { Observable,of } from "rxjs";
import { map, catchError,startWith} from 'rxjs/operators';
import { ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes } from 'src/app/state/product.state';
import { Router } from '@angular/router';
import { EventDriverService } from 'src/app/state/event.driver.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$:Observable<AppDataState<Product[]>>|null=null;
  readonly DataStateEnum=DataStateEnum;
  constructor(private productsService:ProductService,private router:Router,private eventDrivenService:EventDriverService) { }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
    this.onActionEvent(actionEvent);
    })
  }

  onGetAllProducts(){
      this.products$=this.productsService.getAllProducts().pipe(map((data:any)=>{
        console.log(data);
        return({dataState:DataStateEnum.LOADED,data:data})}),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
      );
 
  }
  onGetSelectedProducts(){
    this.products$=this.productsService.getSelectedProducts().pipe(map((data:any)=>{
      console.log(data);
      return({dataState:DataStateEnum.LOADED,data:data})}),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }
  onGetAvailableProducts(){
    this.products$=this.productsService.getAvailableProducts().pipe(map((data:any)=>{
      console.log(data);
      return({dataState:DataStateEnum.LOADED,data:data})}),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }
  onSearch(dataForm:any)
  {
    this.products$=this.productsService.searchProducts(dataForm.keyword).pipe(map((data:any)=>{
      console.log(data);
      return({dataState:DataStateEnum.LOADED,data:data})}),
    startWith({dataState:DataStateEnum.LOADING}),
    catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );   
  }
  onSelect(p:Product){
    this.productsService.select(p)
    .subscribe(data=>{
      p.selected=data.selected;
    })
  }
  onDelete(p:Product){
    let v=confirm("Etes vous sure?")
    if(v==true)
    this.productsService.deleteProduct(p)
    .subscribe(data=>{
      this.onGetAllProducts();
    })
  }
  onNewProduct(){
  this.router.navigateByUrl("/newProduct");
  }
  onEdit(p:Product){
    this.router.navigateByUrl("/editProduct/"+p.id)
  }
  onActionEvent($event:ActionEvent){
    switch($event.type){
      case ProductActionsTypes.GET_ALL_PRODUCTS:this.onGetAllProducts();break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS:this.onGetSelectedProducts();break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS:this.onGetAvailableProducts();break;
      case ProductActionsTypes.SEARCH_PRODUCTS:this.onSearch($event.payload);break;
      case ProductActionsTypes.NEW_PRODUCT:this.onNewProduct();break;
      case ProductActionsTypes.SELECT_PRODUCT:this.onSelect($event.payload);break;
      case ProductActionsTypes.DELETE_PRODUCT:this.onDelete($event.payload);break;
      case ProductActionsTypes.EDIT_PRODUCT:this.onEdit($event.payload);break;
     }
  }
}
