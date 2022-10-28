import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { HomeComponent } from './components/home/home.component';
import { TopicComponent } from './components/topic/topic.component';
import { CongressComponent } from './components/congress/congress.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminCongressAddComponent } from './components/admin/admin-congress-add/admin-congress-add.component';
import { AdminTopicAddComponent } from './components/admin/admin-topic-add/admin-topic-add.component';
import { AdminAnnouncementAddComponent } from './components/admin/admin-announcement-add/admin-announcement-add.component';
import { AdminRegulatoryBoardAddComponent } from './components/admin/admin-regulatory-board-add/admin-regulatory-board-add.component';
import { AdminScienceBoardAddComponent } from './components/admin/admin-science-board-add/admin-science-board-add.component';
import { AdminTransportLayoverAddComponent } from './components/admin/admin-transport-layover-add/admin-transport-layover-add.component';
import { AdminCongressPresidentAddComponent } from './components/admin/admin-congress-president-add/admin-congress-president-add.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminCongressPresidentDeleteComponent } from './components/admin/admin-congress-president-delete/admin-congress-president-delete.component';
import { AdminCongressPresidentUpdateComponent } from './components/admin/admin-congress-president-update/admin-congress-president-update.component';
import { AdminCongressPresidentManagerComponent } from './components/admin/admin-congress-president-manager/admin-congress-president-manager.component';
import { AdminTransportLayoverDeleteComponent } from './components/admin/admin-transport-layover-delete/admin-transport-layover-delete.component';
import { AdminTransportLayoverUpdateComponent } from './components/admin/admin-transport-layover-update/admin-transport-layover-update.component';
import { AdminTransportLayoverManagerComponent } from './components/admin/admin-transport-layover-manager/admin-transport-layover-manager.component';
import { AdminTopicDeleteComponent } from './components/admin/admin-topic-delete/admin-topic-delete.component';
import { AdminTopicUpdateComponent } from './components/admin/admin-topic-update/admin-topic-update.component';
import { AdminTopicManagerComponent } from './components/admin/admin-topic-manager/admin-topic-manager.component';
import { AdminScienceBoardDeleteComponent } from './components/admin/admin-science-board-delete/admin-science-board-delete.component';
import { AdminScienceBoardUpdateComponent } from './components/admin/admin-science-board-update/admin-science-board-update.component';
import { AdminScienceBoardManagerComponent } from './components/admin/admin-science-board-manager/admin-science-board-manager.component';
import { AdminRegulatoryBoardDeleteComponent } from './components/admin/admin-regulatory-board-delete/admin-regulatory-board-delete.component';
import { AdminRegulatoryBoardUpdateComponent } from './components/admin/admin-regulatory-board-update/admin-regulatory-board-update.component';
import { AdminRegulatoryBoardManagerComponent } from './components/admin/admin-regulatory-board-manager/admin-regulatory-board-manager.component';
import { AdminCongressDeleteComponent } from './components/admin/admin-congress-delete/admin-congress-delete.component';
import { AdminCongressUpdateComponent } from './components/admin/admin-congress-update/admin-congress-update.component';
import { AdminCongressManagerComponent } from './components/admin/admin-congress-manager/admin-congress-manager.component';
import { AdminAnnouncementDeleteComponent } from './components/admin/admin-announcement-delete/admin-announcement-delete.component';
import { AdminAnnouncementUpdateComponent } from './components/admin/admin-announcement-update/admin-announcement-update.component';
import { AdminAnnouncementManagerComponent } from './components/admin/admin-announcement-manager/admin-announcement-manager.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { CongressDetailsComponent } from './components/congress-details/congress-details.component';
import { AccountLayoutComponent } from './components/account/account-layout/account-layout.component';
import { AccountLoginComponent } from './components/account/account-login/account-login.component';
import { AccountRegisterComponent } from './components/account/account-register/account-register.component';


@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    AnnouncementComponent,
    HomeComponent,
    TopicComponent,
    CongressComponent,
    ProfileComponent,
    AdminCongressAddComponent,
    AdminTopicAddComponent,
    AdminAnnouncementAddComponent,
    AdminRegulatoryBoardAddComponent,
    AdminScienceBoardAddComponent,
    AdminTransportLayoverAddComponent,
    AdminCongressPresidentAddComponent,
    AdminLayoutComponent,
    AdminCongressPresidentDeleteComponent,
    AdminCongressPresidentUpdateComponent,
    AdminCongressPresidentManagerComponent,
    AdminTransportLayoverDeleteComponent,
    AdminTransportLayoverUpdateComponent,
    AdminTransportLayoverManagerComponent,
    AdminTopicDeleteComponent,
    AdminTopicUpdateComponent,
    AdminTopicManagerComponent,
    AdminScienceBoardDeleteComponent,
    AdminScienceBoardUpdateComponent,
    AdminScienceBoardManagerComponent,
    AdminRegulatoryBoardDeleteComponent,
    AdminRegulatoryBoardUpdateComponent,
    AdminRegulatoryBoardManagerComponent,
    AdminCongressDeleteComponent,
    AdminCongressUpdateComponent,
    AdminCongressManagerComponent,
    AdminAnnouncementDeleteComponent,
    AdminAnnouncementUpdateComponent,
    AdminAnnouncementManagerComponent,
    HomeLayoutComponent,
    CongressDetailsComponent,
    AccountLayoutComponent,
    AccountLoginComponent,
    AccountRegisterComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
