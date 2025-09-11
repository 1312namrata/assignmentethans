import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import TenantsPage from './pages/TenantsPage'
// import Layout from './pages/Layout'
// import MainLayout from './pages/MainLayout'
import ReportsCenter from './pages/ReportsCenter'
import Directory from './pages/Directory'
import { Roles } from './pages/Roles'

import ApproveUsers from './pages/ApproveUser'
import FarmAndField from './pages/FarmAndField'
import { InviteUser } from './pages/InviteUser'
import MainLayout from './Layouts/MainLayout'
import SoilFunctionExplorer from './pages/SoilFunctionExplorer'
import SampleTracker from './pages/SampleTracker'
import LabWorkbench from './pages/LabWorkbench'
import DataConsole from './pages/DataConsole'
import MyAccount from './pages/MyAccount'
import ViewRequest from './pages/ViewRequest'
import RoleAssignment from './pages/RoleAssignment'
import RegionAccess from './pages/RegionAccess'
import  AdminRole from './pages/AdminRole'
import { SuperAdminRole}  from './pages/SuperAdminRole'
import TeamMemberRole from './pages/TeamMemberRole'
import PartnerAdminRole from './pages/PartnerAdminRole'
import PartnerTeamMemberRole from './pages/PartnerTeamMmberRole'
import FarmOwnerRole from './pages/FarmOwner'
import FarmOwner from './pages/FarmOwner'
import Login from './components/Login'
import TeamMemberRoleFields from './pages/TeamMemberRoleFields'
import UserAndTeams from './pages/UserAndTeams'
import ApproveUser from './pages/ApproveUser'
import FieldAccessAssignment from './pages/FieldAccessAssignment'
import FieldAccessAssignmentWithYear from './pages/FieldAccessAssignmentWithYear'
import { SendInvite } from './pages/SendInvite'
import CreateTenant from './pages/CreateTenant'
import AssignFarmsAndFields from './pages/AssignFarmsAndFields'

export const App = () => {
    return (
    <Router>
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<Login/>}> 
        </Route>
      <Route path="/MainLayout" element={<MainLayout/>}>        
          <Route index element={<ReportsCenter />} />
          <Route path="reports" element={<ReportsCenter />} />
          <Route path="soilfunctionexplorer" element={<SoilFunctionExplorer/>} />
          <Route path="sampletracker" element={<SampleTracker/>} />
          <Route path="labworkbench" element={<LabWorkbench/>} />
          <Route path="dataconsole" element={<DataConsole/>} />
          {/* <Route path="usersandte" element={<Layout/>} /> */}
          <Route path="myaccount" element={<MyAccount/>} />
          <Route path="soilfunctionexplorer" element={<SoilFunctionExplorer />} />
        </Route>
          {/* Nested Users & Teams Layout */}
          <Route path="userandteams" element={<UserAndTeams/>}>
            {/* <Route index element={<TenantsPage/>} /> */}
            <Route path="tenants" element={<TenantsPage/>} />
            <Route path="approve-users" element={<ApproveUsers/>} />
            <Route path="directory" element={<Directory/>} />
            <Route path="roles" element={<Roles/>} />
            <Route path="farmsandfields" element={<FarmAndField/>} />
            <Route path="roles" element={<Roles/>} />
            <Route path="invite" element={<InviteUser/>} />
            <Route path="roleassignment" element={<RoleAssignment/>} />
            <Route path="regionaccess" element={<RegionAccess/>} />
            <Route path="fieldaccessassignment" element={<FieldAccessAssignment/>} />
            <Route path="fieldaccessassignmentwithyear" element={<FieldAccessAssignmentWithYear/>} />
            <Route path="sendinvite" element={<SendInvite/>} />
            <Route path="viewrequest" element={<ViewRequest/>} />
            <Route path="super-admin-role" element={<SuperAdminRole/>} />
            <Route path="admin-role" element={<AdminRole/>}/>
            <Route path="team-member-role" element={<TeamMemberRole/>}/>
            <Route path='partner-admin-role' element={<PartnerAdminRole/>}/>
            <Route path='partner-team-member-role' element={<PartnerTeamMemberRole/>}/>
            <Route path='farm-owner' element={<FarmOwner/>}/>
            <Route path='team-member-role-fields'element={<TeamMemberRoleFields/>}/>

</Route>

          {/* User & Teams section used by current UI */}
          <Route path="userandteams" element={<UserAndTeams/>}>
            <Route path="tenants" element={<TenantsPage/>} />
            <Route path="directory" element={<Directory/>} />
            <Route path="approveusers" element={<ApproveUser/>} />
            <Route path="roles" element={<Roles/>} />
            <Route path="farmandfield" element={<FarmAndField/>} />
            <Route path="inviteuser" element={<InviteUser />} />
            <Route path="roleassignment" element={<RoleAssignment/>} />
            <Route path="fieldaccessassignment" element={<FieldAccessAssignment/>} />
            <Route path="fieldaccessassignmentwithyear" element={<FieldAccessAssignmentWithYear/>} />
            <Route path="sendinvite" element={<SendInvite/>} />
            <Route path="viewrequest" element={<ViewRequest/>} />
            <Route path="createtenant" element={<CreateTenant/>} />
            <Route path="assignfarmsandfields" element={<AssignFarmsAndFields/>} />
          </Route>
       
      </Routes>
    </Router>
  )
}
