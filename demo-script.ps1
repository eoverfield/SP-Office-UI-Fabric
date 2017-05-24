#prep:
cd <where you placed git repo>
code .

#Demo 1 - Office UI Fabric in action
#https://dev.office.com/fabric
#inspiration: https://github.com/guzmonne/office-ui-layout
#demo page: https://'tenant'.sharepoint.com/sites/demo-pnp-provisioning/SitePages/Demo%20Fabric%20Grid%20Page.aspx

$creds = Get-Credential

cd 1-FabricInAction

#to build React App Demo
npm start
#bundle package so we can provision to SP
npm run build

#serve up app and other local host assets for SP demo
gulp serve

#look at Live demo
cd solution

#ensure that gulp serve has been run
.\Provision-Branding.ps1 -TargetSiteurl "https://'tenant'.sharepoint.com/sites/demo-pnp-provisioning" -Credentials $creds -ServeLocal $true

#review: https://'tenant'.sharepoint.com/sites/demo-pnp-provisioning/SitePages/Demo%20Fabric%20Grid%20Page.aspx

#disable before moving forward
.\Disable-Branding.ps1 -TargetSiteurl "https://'tenant'.sharepoint.com/sites/demo-pnp-provisioning" -Credentials $creds



#Demo 2 - Office UI Fabric in toolchain
#https://dev.office.com/fabric
#demo page: https://'tenant'.sharepoint.com/sites/demo-pnp-provisioning/SitePages/Demo%20Fabric%20Grid%20Page.aspx

cd ..\..\2-FabricInToolchain

#install npm modules if needed
npm --save install office-ui-fabric office-ui-fabric-js office-ui-fabric-react

#serve up app and other local host assets for SP demo
gulp serve

#look at Live demo
cd solution

#ensure that gulp serve has been run
.\Provision-Branding.ps1 -TargetSiteurl "https://'tenant'.sharepoint.com/sites/demo-pnp-provisioning" -Credentials $creds -ServeLocal $true

#look at source app/css/styles.scss

#disable before moving forward
.\Disable-Branding.ps1 -TargetSiteurl "https://'tenant'.sharepoint.com/sites/demo-pnp-provisioning" -Credentials $creds



#demo 3 - Fabric React Webpart
#https://github.com/SharePoint/sp-dev-fx-webparts
cd ..\..\3-FabricReactWebpart

#look in src folder for demo
gulp serve

#check out 3-FabricReactWebpart\src\webparts\reactDemo\components .tsx file
#check out workbench


#demo 4 - Extend the UI Fabric
#need to download Fabric UI JS source
#https://github.com/OfficeDev/office-ui-fabric-js
#demo page: https://'tenant'.sharepoint.com/sites/demo-pnp-provisioning/SitePages/Demo%20Fabric%20Grid%20Page.aspx

cd ..\..\4-ExtendFabric

#rebuild Fabric JS in second powershell
cd .\src\office-ui-fabric-js-master
gulp watch

#now rebuild project
cd ../../
gulp serve

#switch to live demo deployment folder
cd ..\..\solution

#ensure that gulp serve has been run - provision to SP
.\Provision-Branding.ps1 -TargetSiteurl "https://'tenant'.sharepoint.com/sites/demo-pnp-provisioning" -Credentials $creds

#disable before moving forward
.\Disable-Branding.ps1 -TargetSiteurl "https://'tenant'.sharepoint.com/sites/demo-pnp-provisioning" -Credentials $creds

