import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../components/Login';
import SoilFunctionExplorer from '../pages/SoilFunctionExplorer';
import ReportsCenter from '../pages/ReportsCenter';
import SampleTracker from '../pages/SampleTracker';
import LabWorkbench from '../pages/LabWorkbench';
import DataConsole from '../pages/DataConsole';
import MyAccount from '../pages/MyAccount';
import SuperAdminLayout from '../Layouts/SuperAdminLayout/SuperAdminLayout';
import  Directory from '../pages/Directory';
import { InviteUser } from '../pages/InviteUser';
// import { Tenants } from '../pages/Tenants';
import FarmAndField from '../pages/FarmAndField';
import { Roles } from '../pages/Roles';
import  ApproveUser  from '../pages/ApproveUser';
import RoleAssignment from '../pages/RoleAssignment';
import FieldAccessAssignment from '../pages/FieldAccessAssignment';
import {SendInvite} from '../pages/SendInvite';
import FieldAccessAssignmentWithYear from '../pages/FieldAccessAssignmentWithYear';
import ViewRequest    from '../pages/ViewRequest';
import UserAndTeams from '../pages/UserAndTeams';
import CreateTenant from '../pages/CreateTenant';




 const AppRoutes = () => {
     
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Login/>} />
         {/* <Route path="/" element={user ? <Navigate to="/superadmin/sampletracker" /> : <Login />} /> */}
            {/* <Route path="/login" element={<Login/>} />  */}
          
            <Route element={<SuperAdminLayout />}>
                    {/* <Route path="/dashboard" element={<Navigate to="reportscenter" replace />} /> */}
                    <Route path="/reportscenter" element={<ReportsCenter />} />
                    <Route path="/sampletracker" element={<SampleTracker />} />
                    <Route path="/labworkbench" element={<LabWorkbench />} />
                    <Route path="/dataconsole" element={<DataConsole />} />
                    <Route path="/soilfunctionexplorer" element={<SoilFunctionExplorer />} />
                    <Route path="/myaccount" element={<MyAccount />} />
            </Route>
           
             
            <Route path='/userandteams' element={<UserAndTeams/>}>
                <Route path="directory" element={<Directory/>} />
                <Route path="approveusers" element={<ApproveUser/>} />
                <Route path="roles" element={<Roles />} />
                <Route path="farmandfield" element={<FarmAndField />} />
                {/* <Route path="tenants" element={<Tenants />} /> */}
                <Route path="inviteuser" element={<InviteUser />} />
                <Route path="roleassignment" element={<RoleAssignment/>} />
                <Route path="fieldaccessassignment" element={<FieldAccessAssignment/>} />
                <Route path="fieldaccessassignmentwithyear" element={<FieldAccessAssignmentWithYear/>} />
                <Route path="sendinvite" element={<SendInvite/>} />
                <Route path="viewrequest" element={<ViewRequest/>} />
                <Route path="createtenant" element={<CreateTenant/>} />
            </Route>         
        </Routes>
      </BrowserRouter>
  )
}
export default AppRoutes;

    








    





          
        
      
   
   
 
