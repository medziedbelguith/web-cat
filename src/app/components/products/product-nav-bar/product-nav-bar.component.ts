import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { EventDriverService } from 'src/app/state/event.driver.service';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-nav-bar',
  templateUrl: './product-nav-bar.component.html',
  styleUrls: ['./product-nav-bar.component.css']
})
export class ProductNavBarComponent implements OnInit {
  //@Output() productEventEmitter:EventEmitter<ActionEvent>=new EventEmitter();
  constructor(private eventDrivenService:EventDriverService) { }

  ngOnInit(): void {
  }
  onGetSelectedProducts(){
    //this.productEventEmitter.emit({type:ProductActionsTypes.GET_SELECTED_PRODUCTS});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.GET_SELECTED_PRODUCTS})
  }
  onGetAllProducts(){
  //this.productEventEmitter.emit({type:ProductActionsTypes.GET_ALL_PRODUCTS});
  this.eventDrivenService.publishEvent({type:ProductActionsTypes.GET_ALL_PRODUCTS})
  }
  onGetAvailableProducts(){
    //this.productEventEmitter.emit({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS})
  }
  onNewProduct(){
    //this.productEventEmitter.emit({type:ProductActionsTypes.NEW_PRODUCT});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.NEW_PRODUCT})
  }
  onSearch(dataForm:any){
  //  this.productEventEmitter.emit({type:ProductActionsTypes.SEARCH_PRODUCTS,payload:dataForm});
  this.eventDrivenService.publishEvent({type:ProductActionsTypes.SEARCH_PRODUCTS,payload:dataForm})
  }
}
