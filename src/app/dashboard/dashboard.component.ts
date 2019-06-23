import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataService} from '../_services/dataservice.service';
import { Router } from '@angular/router';
import { AuthenticationService} from '../_services/authentication.service';

export interface leadData {
  groupId: string;
  name: string;
  status: string;
  type: string;
  createdBy: string;
  updateDate: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['groupId', 'name', 'type', 'status','details'];
  dataSource: MatTableDataSource<leadData>;

  isLoading:boolean=true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _dataService:DataService,private _router :Router,private _service :AuthenticationService) { 

  }

  ngOnInit() {
    this.getData();
  }

  public getData(){
    this._dataService.getLeads().subscribe(res=>{
      //console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.isLoading=false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    },
    err=>{
       alert(err.error.message);
       if(err.error.error=="Unauthorized"){
         this._service.logout();
         this._router.navigate(['/']);
       }
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  redirectToDetails(id){
    alert(id);
  }
  
}