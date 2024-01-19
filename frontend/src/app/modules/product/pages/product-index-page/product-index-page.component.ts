import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { ProductResponse } from 'src/app/shared/interface/product.interface';
import { ProductCreateModalComponent } from '../../modals/product-create-modal/product-create-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductEditModalComponent } from '../../modals/product-edit-modal/product-edit-modal.component';

@Component({
  selector: 'app-product-index-page',
  templateUrl: './product-index-page.component.html',
  styleUrls: ['./product-index-page.component.scss']
})
export class ProductIndexPageComponent implements OnInit {


  page:{
    loading:boolean,
    error:boolean,
    title:string,
  }
  products:ProductResponse[]=[]

  paginateData:any;
  pageIndex:number=0;
  take:number=1;

  table:{
    headers:string[],
    dataSource:MatTableDataSource<ProductResponse>
  }
  @ViewChild(MatTable) tableView!: MatTable<any>;
  @ViewChild(MatPaginator,{static:true}) paginatorView!: MatPaginator;

  constructor(
    private _productService:ProductService,
    private _notifyService:NotifyService,
    private _dialog:MatDialog,
  ) { 
    this.page={
      loading:true,
      error:false,
      title:'Mis Productos'
    }
    this.table={
      headers:[
        'id', 'name', 'category', 'actions'
      ],
      dataSource:new MatTableDataSource(this.products)
    }
  }

  ngOnInit(): void {
    this.getInitData();
  }

  getInitData() {
    this.page.loading=true;
    this.page.error=false;
    const currentPage=this.pageIndex+1
    this._productService.getProducts(
      currentPage, this.take
    )
    .subscribe(
      result=>{
        if(result.status){
          const {data}=result.data
          this.products=data.data
          this.table.dataSource.data=this.products;
          delete data.data;
          this.paginateData=data;
          this.pageIndex = this.paginateData.current_page - 1
        }else{  
          this.page.error=true;
          this._notifyService.showSingleMessage(result.message);
        }
        this.page.loading=false;
      },
      onError=>{
        this.page.error=true;
      }
    )
  }

  openCreate(){
    const dialogRef = this._dialog.open( ProductCreateModalComponent, {
			width : '80%',
      maxWidth:'450px',
			disableClose : true,
		});

		dialogRef.componentInstance.onCreated.subscribe(( result ) => {
			this.products.unshift(result)
		});
  }

  openDelete(product:ProductResponse){

  }

  openEdit(product:ProductResponse){
    const dialogRef = this._dialog.open( ProductEditModalComponent, {
			width : '80%',
      maxWidth:'450px',
			disableClose : true,
      data:{
        productId:product.id
      }
		});

		dialogRef.componentInstance.onUpdated.subscribe(( result ) => {
      const index=this.products.findIndex(current=>current.id===result.id)
			this.products[index]=result;
      this.table.dataSource.data=this.products
		});
  }

  nextPage( event:any ) {
		this.take = event.pageSize
		this.pageIndex= event.pageIndex
		this.getInitData();
	}

}
