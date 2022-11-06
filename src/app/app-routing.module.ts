import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './components/account/account-layout/account-layout.component';
import { LoginComponent } from './components/account/account-login/account-login.component';
import { RegisterComponent } from './components/account/account-register/account-register.component';
import { AdminAnnouncementManagerComponent } from './components/admin/admin-announcement-manager/admin-announcement-manager.component';
import { AdminCongressManagerComponent } from './components/admin/admin-congress-manager/admin-congress-manager.component';
import { AdminCongressPresidentManagerComponent } from './components/admin/admin-congress-president-manager/admin-congress-president-manager.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminRegulatoryBoardManagerComponent } from './components/admin/admin-regulatory-board-manager/admin-regulatory-board-manager.component';
import { AdminScienceBoardManagerComponent } from './components/admin/admin-science-board-manager/admin-science-board-manager.component';
import { AdminTopicManagerComponent } from './components/admin/admin-topic-manager/admin-topic-manager.component';
import { AdminTransportLayoverManagerComponent } from './components/admin/admin-transport-layover-manager/admin-transport-layover-manager.component';
import { AdminUserManagerComponent } from './components/admin/admin-user-manager/admin-user-manager.component';
import { CongressDetailsComponent } from './components/congress-details/congress-details.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SeeAllAnnounceComponent } from './components/see-all-announce/see-all-announce.component';
import { TopicComponent } from './components/topic/topic.component';
import { TransportLayoverComponent } from './components/transport-layover/transport-layover.component';
import { LoginGuard } from './guards/login.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] },
  { path: 'congress-details/:congressid', component: CongressDetailsComponent },
  { path: 'announcement/seeallannounce', component: SeeAllAnnounceComponent },
  { path: 'transportlayover', component: TransportLayoverComponent },
  { path: 'topic', component: TopicComponent },
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      { path: 'announcement/manager', component: AdminAnnouncementManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'Admin' } },
      { path: 'congress/manager', component: AdminCongressManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'Admin' } },
      { path: 'congresspresident/manager', component: AdminCongressPresidentManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'Admin' } },
      { path: 'regulatoryboard/manager', component: AdminRegulatoryBoardManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'Admin' } },
      { path: 'scienceboard/manager', component: AdminScienceBoardManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'Admin' } },
      { path: 'topic/manager', component: AdminTopicManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'Admin' } },
      { path: 'transportlayvoer/manager', component: AdminTransportLayoverManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'Admin' } },
      { path: 'user/manager', component: AdminUserManagerComponent, canActivate: [LoginGuard, RoleGuard], data: { expectedRole: 'Admin' } }
    ]
  },
  {
    path: 'account', component: AccountLayoutComponent, children: [
      { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
