import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdminService} from "../../../../core/_service/protected/admin.service";
import {BehaviorSubject} from "rxjs";
import {UserWithRoles} from "../../../../core/_dataTypes/user-with-roles";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialogRef} from "@angular/material/dialog";
import {EnumRole} from "../../../../core/_dataTypes/user-interface";

@Component({
  selector: 'app-change-role-dialog',
  templateUrl: './change-role-dialog.component.html',
  styleUrls: ['./change-role-dialog.component.scss']
})
export class ChangeRoleDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  data: UserWithRoles[];
  isAdminData: boolean[] = [];

  loaded$: BehaviorSubject<boolean>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[];
  dataSource: MatTableDataSource<UserWithRoles>;


  constructor(public dialogRef: MatDialogRef<ChangeRoleDialogComponent>,
              private adminService: AdminService) {
    this.loaded$ = new BehaviorSubject<boolean>(false);
    this.data = [];
    this.displayedColumns = ['user', 'isUser', 'isAdmin'];
    this.dataSource = new MatTableDataSource<UserWithRoles>()
  }

  ngOnDestroy(): void {
    this.loaded$.unsubscribe();
  }

  ngOnInit(): void {
    this.adminService.getFriendsWithRoles().then(value => {
      this.data = value;
      this.isAdminData = this.data.map(
        (elem) => {
          let isAdmin:boolean;
          elem.roles.some(role => role === EnumRole.ADMIN) ? isAdmin = true: isAdmin = false;
          return isAdmin;
        }
      )
      console.log(this.isAdminData);

      this.dataSource.data = this.data;
      this.loaded$.next(true);
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  changeRole(element: UserWithRoles) {
    const index = this.dataSource.filteredData.indexOf(element)
    let action = !this.isAdminData[index];
    if (action){
      this.adminService.addRole(element.email, EnumRole.ADMIN).then(()=> {
        this.isAdminData[index] = !this.isAdminData[index];
      });
    }else{
      this.adminService.removeRole(element.email, EnumRole.ADMIN).then(()=>{
        this.isAdminData[index] = !this.isAdminData[index];
      });
    }
  }
}
