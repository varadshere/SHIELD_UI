angular.module('shield').controller('AnalyticsPartialCtrl',function($scope,shieldService){

var date_time_list = [];
var webData = '';
var labels = [];

var dict = {"Jan":0, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0,"Aug":0,"Sep":0,"Oct":0,"Nov":0,"Dec":0};
var completeD = {};
shieldService.getWebCamData().then(function (data) {

        $scope.webCamData = data.message;
        webData =  $scope.webCamData ;
       for(k=0;k<webData.length;k++)
        {
            var temp = webData[k].webcam_date_time;
            var yearselected = temp.slice(12,16);
            completeD[yearselected] = {"Jan":0, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0,"Aug":0,"Sep":0,"Oct":0,"Nov":0,"Dec":0};
          }

        for(q=0;q<webData.length;q++)
        {

            var diction = [];
            var temp = webData[q].webcam_date_time;

            var yearselected = temp.slice(12,16);
            var monthselected = temp.slice(8,11);

            completeD[yearselected][monthselected] = completeD[yearselected][monthselected]+1;

          }
//console.log("completeD",completeD);
$scope.year = Object.keys(completeD);
// set default value in drop down to the current year
var cal = new Date().getFullYear();
$scope.selectedName = String(cal);
setData(String(cal));

$scope.getValue = function (x) {
                var selYear = $scope.selectedName;
                console.log("year selected"+selYear)
                setData(selYear);
              };


function setData(selYear)
{
$scope.labels =  Object.keys(completeD[selYear]);
$scope.series = ['Webcam Images'];
  $scope.data = [ Object.values(completeD[selYear])];
  $scope.onClick = function (points, evt) {
    //console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }

      ]
    }
  };

};


   });

var completeS = {};
shieldService.getScrCapData().then(function (data) {
        //console.log(data.message)
        $scope.scrnCapData = data.message;
        webData =  $scope.scrnCapData ;
       for(k=0;k<webData.length;k++)
        {
            var temp = webData[k].scrshot_date_time;
            var yearselected = temp.slice(12,16);
            completeS[yearselected] = {"Jan":0, "Feb":0, "Mar":0, "Apr":0, "May":0, "Jun":0, "Jul":0,"Aug":0,"Sep":0,"Oct":0,"Nov":0,"Dec":0};
          }

        for(q=0;q<webData.length;q++)
        {

            var diction = [];
            var temp = webData[q].scrshot_date_time;

            var yearselected = temp.slice(12,16);
            var monthselected = temp.slice(8,11);

            completeS[yearselected][monthselected] = completeS[yearselected][monthselected]+1;

          }

$scope.scrnYear = Object.keys(completeS);
// set default value in drop down to the current year
var cal = new Date().getFullYear();
$scope.selectedScrnName = String(cal);
setDataScrn(String(cal));

$scope.getVal = function (x) {
                var selYear = $scope.selectedScrnName;
                console.log("year selected"+selYear)
                setDataScrn(selYear);
              };


function setDataScrn(selYear)
{
$scope.labelsScrn =  Object.keys(completeS[selYear]);
$scope.seriesScrn  = ['Screenshot Images'];
  $scope.dataScrn = [ Object.values(completeS[selYear])];
  $scope.onClick = function (points, evt) {
    //console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }

      ]
    }
  };

};


   });

});
