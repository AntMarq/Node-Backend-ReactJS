export const hasEvenement = tournee => {
    return tournee.interventions.some(inter=>inter.evenements.length>0);
};

export const updateInterventionStatus = (interId, tourneeId, newStatus, pdfInterId, heureReelDebut, heureReelFin, tournees) => {
    return tournees.map((tournee)=>{
        tournee.interventions = tournee.interventions.map((inter)=>{
            if(inter.id === interId){
                return {...inter, status:newStatus, pdfInterId: pdfInterId, heureReelDebut: heureReelDebut, heureReelFin: heureReelFin}
            }
            else return inter;
        });
        if(tournee.id === tourneeId){
            return {...tournee}
        }
        else return tournee;
    })

};

export const updateEvenement = (evenement, tournees) => {
    let _interFind = false;
    return tournees.map((tournee)=>{
        tournee.interventions = tournee.interventions.map((inter)=>{
            if(inter.id === evenement.interventionId){
                _interFind = true;
                inter.evenements = [...inter.evenements, evenement];
                return {...inter}
            }
            else return inter;
        });
        if(_interFind){
            return {...tournee}
        }
        else return tournee;
    })
};

export const isTourneeOpen = (tourneeId, tourneesOpen) => {
    return tourneesOpen.findIndex( id => id === tourneeId);
};

export const isInterventionOpen = (interventionId, interventionsOpen) => {
    return interventionsOpen.findIndex( id => id === interventionId);
};

export const findTourneeStatus = tournee => {
    if(tournee.interventions.every(inter=>inter.status === 2)) return 2;
    else if(tournee.interventions.some(inter=>inter.status === 1)) return 1;
    else return 0;
};

export const findTourneeFromInterventionId = (tournees, interventionId) => {
    let selectedTournee = {};
    tournees.forEach(tournee => {
        if(tournee.interventions.find(intervention => intervention.id === interventionId)) {
            selectedTournee = tournee;
        }
    });
    return selectedTournee;
};

export const showPdf = (blob, numBi) => {
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    let newBlob = new Blob([blob], {type: "application/pdf"});

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
    }

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(newBlob);
    let link = document.createElement('a');
    link.href = data;
    link.download = "BI_"+ numBi + ".pdf";
    link.click();
     setTimeout(function(){
     // For Firefox it is necessary to delay revoking the ObjectURL
     window.URL.revokeObjectURL(data);}, 100)
};