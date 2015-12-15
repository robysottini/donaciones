app.controller('frmCargaManual', ['$scope', '$http', '$sce', 'URLS', function($scope, $http, $sce, URLS) {
	$scope.legajos = [];
	$scope.personSelected = [];


	// Busca para el autocomplete
	$scope.getPersons = function(val) {
		return $http.get('data/getRemoteData.php', {
			params: {
				remote_url: URLS.server + "/h3_persons.php?action=getAllActivePersons&word=" + val,
				sensor: false
			}
		}).then(function(response) {
			var persons = [];
			angular.forEach(response.data, function(item) {
				persons.push(item);
			});
			return persons;
		});
	};

	$scope.personSelected = [];
	$scope.rowCollection = [];
	$scope.idcman = "";
	$scope.idtcman = "";
	$scope.frmano = (new Date()).getFullYear();
	$scope.frmmes = 1;
	$scope.frmcantidad = 0;
	$scope.statusMsg = "";

	$scope.getDataTable = function() {
		$scope.statusMsg = "Actualizando tabla...";
		var mescman = "&mescman=" + $scope.frmmes;
		var anocman = "&anocman=" + $scope.frmano;
		$scope.personSelected = [];
		$scope.idcman = "";
		$scope.frmcantidad = 0;

		var url = URLS.server + "/h3_cargamanual.php?";
		url += "action=getAllRecords";
		url += "&idtcman=" + $scope.idtcman;
		url += mescman;
		url += anocman;
		$http.get('data/getRemoteData.php', {
			params: {
				remote_url: url
			}
		}).then(function(response) { 
			$scope.rowCollection = [];
			angular.forEach(response.data, function(item) {
				$scope.rowCollection.push(item);
			});
			$scope.statusMsg = "";
		});
	}

	$scope.getRecord = function() {
		var mescman = "&mescman=" + $scope.frmmes;
		var anocman = "&anocman=" + $scope.frmano;
		var idper = "&idper=" + $scope.personSelected.idper;
		
		var url=URLS.server + "/h3_cargamanual.php?";
		url += "action=getRecordByEntry";
		url += "&idtcman=" + $scope.idtcman;
		url += mescman;
		url += anocman;
		url += idper;

		$scope.idcman = "";
		$scope.frmcantidad = "0";
		$http.get('data/getRemoteData.php', {
			params: {
				remote_url: url
			}
		}).then(function(response) {
			angular.forEach(response.data, function(item) {
				$scope.idcman = item.idcman;
				$scope.personSelected = item;
				$scope.frmcantidad = item.cantcman;
			});
		});
	}

	$scope.pushData = function(item) {
		$scope.personSelected = item;
		$scope.getRecord();
	}

	$scope.clearForm = function() {
		$scope.idcman = "";
		$scope.frmcantidad = 0;
		$scope.frmano = (new Date()).getFullYear();
		$scope.frmmes = 1;
		$scope.personSelected = [];
		$scope.getDataTable();
	}

	$scope.validateInvalidForm = function() {
		if ($scope.personSelected.idper == null) {
			$scope.frmCargaManual.agente.$error.required = true;
			return true;
		}
		return false;
	}

	$scope.updateRecord = function() {
		if ($scope.validateInvalidForm() || $scope.frmCargaManual.$invalid) {
			return;
		}
		$scope.statusMsg = "Actualizando datos...";
		var mescman = "&mescman=" + $scope.frmmes;
		var anocman = "&anocman=" + $scope.frmano;
		var idper = "&idper=" + $scope.personSelected.idper;

		var url = URLS.server + "/h3_cargamanual.php?";
		url += "action=updateRecord";
		url += "&idtcman=" + $scope.idtcman;
		url += "&cantidad=" + $scope.frmcantidad;
		url += "&idadm=1" ;
		url += mescman;
		url += anocman;
		url += idper;

		$scope.idcman = "";
		$scope.frmcantidad = "0";
		$http.get('data/getRemoteData.php', {
			params: {
				remote_url: url
			}
		}).then(function(response) {
			$scope.statusMsg = "";
			$scope.clearForm();
		});
	}
}]);
