import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, ModalBody} from 'reactstrap';
import Moment from 'react-moment';
import {act_goToTournees, act_onDownloadPdf, act_closePhotoModal} from '../actions';
import pdf from '../assets/pdf.svg';
import Round from './Round';
import EvenementDetail from './EvenementDetail';
import './Modal.css'
import {INTERVENTION_STATUS} from '../constants';
import {getEvenementImage} from '../services/WebServices';
import {isTourneeOpen} from '../utils';


class InterventionDetail extends Component {

    pdfLink () {
        let {colors} = this.props.theme;
        let {selectedIntervention} = this.props;
        return (
            <div style={{display: 'flex', position: 'absolute', right: 0}}>
                <img src={pdf}/>
                <div style={{fontFamily: 'robotoBold', fontSize: 15, color: colors.GREEN, textDecoration: 'underline', cursor: 'pointer', paddingLeft: 15}} onClick={() => this.props.act_onDownloadPdf(selectedIntervention.pdfInterId, selectedIntervention.numBi)}>Télécharger le bon d'intervention</div>
            </div>
        )
    }

    photoModal () {
        let {selectedPhoto} = this.props;
        return (
            <Modal isOpen={selectedPhoto.fichierId !== null} 
                style={{cursor:'pointer'}}
                backdrop={true} className="modal-custom" toggle= {() => this.props.act_closePhotoModal()} onClick={() => this.props.act_closePhotoModal()}>
                <ModalBody>
                    <div style={{width: '80vw', height: '80vh', backgroundImage: `url(${getEvenementImage(selectedPhoto.fichierId)})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center'}}>
                    </div>
                </ModalBody>
            </Modal>
        )
    }

    evenementsDetail () {
        let {colors} = this.props.theme;
        let {selectedIntervention} = this.props;
        return (
            <div style={{display: 'flex', flexDirection: 'column', flex: 1, paddingLeft: 10}}>
                <div style={{minHeight: 44, width: '100%', backgroundColor: colors.ORANGE, color: 'white', display: 'flex', alignItems: 'center', textAlign: 'center', marginBottom: 10}}>
                    <div style={{flex: 1, fontFamily: 'dinMedium', fontSize: 18, letterSpacing: 0.5}}>ÉVÈNEMENTS ({selectedIntervention.evenements.length})</div>
                </div>
                <div style={{flex: 1}}>
                    {
                        selectedIntervention.evenements.map( evenement => <EvenementDetail key={evenement.id} evenement={evenement}/>)
                    }
                </div>
            </div>
        )
    }


    render() {
        let {colors} = this.props.theme;
        let {tourneesOpen, selectedRound, selectedIntervention, selectedPhoto} = this.props;
        let pdf = selectedIntervention.pdfInterId ? this.pdfLink() : "";
        let evenementsDetail = selectedIntervention.evenements.length > 0 ? this.evenementsDetail() : "";
        let photoModal = selectedPhoto.fichierId ? this.photoModal() : "";
        return (
            <div style={{width: '100%', display:'flex', flexDirection: 'column', flex: 1, overflow: isTourneeOpen(selectedRound.id, tourneesOpen) !== -1 ? 'auto' : 'unset'}}>
                <div style={{width: '100%', minHeight: 50, display:'flex', alignItems: 'center', padding: '0 204px', backgroundColor: colors.LIGHT_GREY, color: colors.PURPLE}}>
                    <div onClick={()=>this.props.act_goToTournees()} style={styles.link}>Liste des tournées&nbsp;</div>
                    <div style={{fontFamily: 'robotoMedium', fontSize: 14}}>>&nbsp;Détail intervention {selectedIntervention.id}</div>
                </div>
                <div style={{padding: '15px 204px 0'}}>
                    <Round round={selectedRound} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.PURPLE, fontSize: 20, margin: '10px 204px 30px', position: 'relative'}}>
                        <div style={{fontFamily: 'robotoBold'}}>Intervention N°{selectedIntervention.id} -&nbsp;</div>
                        <div style={{fontFamily: 'robotoLight'}}>{INTERVENTION_STATUS[selectedIntervention.status]}</div>
                        {pdf}
                    </div>
                    <div style={{display: 'flex', flex: 1, padding: '0 280px', overflow: isTourneeOpen(selectedRound.id, tourneesOpen) !== -1 ? 'unset' : 'auto'}}>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 1, paddingRight: 10}}>
                            <div style={{minHeight: 44, width: '100%', backgroundColor: colors.MEDIUM_BLUE, color: 'white', display: 'flex', alignItems: 'center', textAlign: 'center', marginBottom: 10}}>
                                <div style={{flex: 1, fontFamily: 'dinMedium', fontSize: 18, letterSpacing: 0.5}}>FICHE D'INTERVENTION</div>
                            </div>
                            <div style={{minHeight: 190, ...styles.container}}>
                                <div style={{...styles.title, color: colors.MEDIUM_BLUE}}>
                                    Détails intervention
                                </div>
                                <div style={{...styles.containerDatas, color: colors.DARK_BLUE}}>
                                    <div style={{flex: 1, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            HORAIRES PRÉVUES:
                                        </div>
                                        <div style={{...styles.value}}>
                                            <Moment locale="fr" parse="HH:mm" format="HH[h]mm">{selectedIntervention.heureDebut}</Moment>&nbsp;-&nbsp;<Moment locale="fr" parse="HH:mm" format="HH[h]mm">{selectedIntervention.heureFin}</Moment>
                                        </div>
                                    </div>
                                    <div style={{flex: 2, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            DOSSIER :
                                        </div>
                                        <div style={{fontFamily: 'robotoRegular'}}>
                                            {selectedIntervention.dossier}
                                        </div>
                                    </div>
                                </div>
                                <div style={{...styles.containerDatas, color: colors.DARK_BLUE}}>
                                    <div style={{flex: 1, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            HORAIRES RÉELS:
                                        </div>
                                        {
                                            selectedIntervention.heureReelDebut && selectedIntervention.heureReelFin ?
                                                <div style={{...styles.value}}>
                                                    <Moment locale="fr" parse="HH:mm" format="HH[h]mm">{selectedIntervention.heureReelDebut}</Moment>&nbsp;-&nbsp;<Moment locale="fr" parse="HH:mm" format="HH[h]mm">{selectedIntervention.heureReelFin}</Moment>
                                                </div> : ""
                                        }
                                    </div>
                                    <div style={{flex: 2, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            BI :
                                        </div>
                                        <div style={{...styles.value}}>
                                            {selectedIntervention.numBi}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{minHeight: 230, ...styles.container}}>
                                <div style={{...styles.title, color: colors.MEDIUM_BLUE}}>
                                    Informations client
                                </div>
                                <div style={{...styles.containerDatas, color: colors.DARK_BLUE}}>
                                    <div style={{flex: 1, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            CLIENT :
                                        </div>
                                        <div style={{...styles.value}}>
                                            {selectedIntervention.clientId}
                                        </div>
                                    </div>
                                    <div style={{flex: 1, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            NOM :
                                        </div>
                                        <div style={{...styles.value}}>
                                            {selectedIntervention.clientName}
                                        </div>
                                    </div>
                                    <div style={{flex: 1, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            INTERLOCUTEUR :
                                        </div>
                                        <div style={{...styles.value}}>
                                            {selectedIntervention.contact}
                                        </div>
                                    </div>
                                </div>
                                <div style={{...styles.containerDatas, color: colors.DARK_BLUE}}>
                                    <div style={{flex: 1, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            ADRESSE :
                                        </div>
                                        <div style={{...styles.value}}>
                                            {selectedIntervention.numRue} {selectedIntervention.rue}, {selectedIntervention.codePostal} {selectedIntervention.ville}
                                        </div>
                                    </div>
                                </div>
                                <div style={{...styles.containerDatas, color: colors.DARK_BLUE}}>
                                    <div style={{flex: 1, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            TEL :
                                        </div>
                                        <div style={{...styles.value}}>
                                            {selectedIntervention.tel}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{minHeight: 230, ...styles.container}}>
                                <div style={{...styles.title, color: colors.MEDIUM_BLUE}}>
                                    Prestation
                                </div>
                                <div style={{...styles.containerDatas, color: colors.DARK_BLUE}}>
                                    <div style={{flex: 1, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            TYPE :
                                        </div>
                                        <div style={{...styles.value}}>
                                            {selectedIntervention.prestation}
                                        </div>
                                    </div>
                                </div>
                                <div style={{...styles.containerDatas, color: colors.DARK_BLUE}}>
                                    <div style={{flex: 2, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            MATÉRIEL :
                                        </div>
                                        <div style={{...styles.value}}>
                                            {selectedIntervention.materiel}
                                        </div>
                                    </div>
                                    <div style={{flex: 1, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            QUANTITÉ :
                                        </div>
                                        <div style={{...styles.value}}>
                                            {selectedIntervention.quantite}
                                        </div>
                                    </div>
                                </div>
                                <div style={{...styles.containerDatas, color: colors.DARK_BLUE}}>
                                    <div style={{flex: 1, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            DÉCHET :
                                        </div>
                                        <div style={{...styles.value}}>
                                            {selectedIntervention.codeDechet}, {selectedIntervention.dechet}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{minHeight: 190, ...styles.container}}>
                                <div style={{...styles.title, color: colors.MEDIUM_BLUE}}>
                                    Site de vidage
                                </div>
                                <div style={{...styles.containerDatas, color: colors.DARK_BLUE}}>
                                    <div style={{flex: 1, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            CODE :
                                        </div>
                                        <div style={{...styles.value}}>
                                            {selectedIntervention.codeSiteVidage}
                                        </div>
                                    </div>
                                    <div style={{flex: 2, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            NOM :
                                        </div>
                                        <div style={{...styles.value}}>
                                            {selectedIntervention.siteVidage}
                                        </div>
                                    </div>
                                </div>
                                <div style={{...styles.containerDatas, color: colors.DARK_BLUE}}>
                                    <div style={{flex: 1, ...styles.data}}>
                                        <div style={{...styles.subTitle}}>
                                            ADRESSE :
                                        </div>
                                        <div style={{...styles.value}}>
                                            {selectedIntervention.svRue} - {selectedIntervention.svCodePostal} {selectedIntervention.svVille}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{minHeight: 140, ...styles.container}}>
                                <div style={{...styles.title, color: colors.MEDIUM_BLUE}}>
                                    Commentaire
                                </div>
                                <div style={{flex: 1, paddingTop: 15, fontFamily: 'robotoItalic', color: colors.MEDIUM_BLUE}}>
                                    {selectedIntervention.commentaire}
                                </div>
                            </div>

                        </div>
                        {evenementsDetail}
                    </div>
                </div>
                {photoModal}
            </div>
        )
    }
}

const styles={
    link:{
        fontFamily: 'robotoBlack', 
        fontSize: 14,
        textDecoration:'underline',
        cursor:'pointer'
    },
    container: {
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 30px',
        marginBottom: 5,
        border: '1px solid rgba(185, 193, 205, 0.34)'
    },
    title: {
        paddingBottom: 15,
        borderBottom: '1px solid #dbdde4',
        fontFamily: 'robotoBold',
        fontSize: 17
    },
    containerDatas: {
        flex: 1,
        display: 'flex',
        paddingTop: 15
    },
    data: {
        display: 'flex',
        flexDirection: 'column'
    },
    subTitle: {
        fontFamily: 'robotoLight',
        fontSize: 10
    },
    value: {
        fontFamily: 'robotoRegular'
    }
};

function mapStateToProps(state, ownProps){
    return {
        theme: state.appContent.theme,
        tourneesOpen: state.appContent.tourneesOpen,
        selectedRound: state.appContent.selectedRound,
        selectedIntervention: state.appContent.selectedIntervention,
        selectedPhoto: state.appContent.selectedPhoto
    }
}

export default connect(
    mapStateToProps,
    {act_goToTournees, act_onDownloadPdf, act_closePhotoModal}
)(InterventionDetail)
