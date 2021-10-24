import avatar_default from '../img/avatar_default.png';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';

function Contact(props) {
  return (
    <Grid container direction="column">
      <Avatar alt="Avatar" src={avatar_default} sx={{ width: 138, height: 138,  mx: 'auto', mt: 64 }} />
      <Typography variant="body1" color="text.main" sx={{ mt: 18,  mx: 'auto' }}>{props.contact.name}</Typography>
      <Typography variant="body2" color="text.main" sx={{ mt: 3, mx: 'auto' }}>{props.contact.name}</Typography>
      <Typography
        variant="h4"
        color="primary.main"
        sx={{ mt: 3, mb: 74, mx: 'auto' }}
        style={{ cursor: 'pointer' }}>
          <u>Editar datos</u>
      </Typography>
      <Box pr={10}>
        <Accordion elevation={0}>
          <AccordionSummary
            expandIcon={ <ExpandMoreIcon  fontSize="small"/> }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="subtitle2" pl={29}>Datos del contacto</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box pl={29}>
              <Typography variant="h5" color="text.headerdetail" mb={3}>Notas</Typography>
              <Typography variant="subtitle2" color="text.textdetails" mb={12}>{props.contact.name}</Typography>
              <Typography variant="h5" color="text.headerdetail" mb={3}>Edad</Typography>
              <Typography variant="subtitle2" color="text.textdetails" mb={12}>{props.contact.age}</Typography>
              <Typography variant="h5" color="text.headerdetail" mb={3}>Correo</Typography>
              <Typography variant="subtitle2" color="text.textdetails" mb={12}>{props.contact.email}</Typography>
              <Typography variant="h5" color="text.headerdetail" mb={3}>Prioridad</Typography>
              <Typography variant="subtitle2" color="text.textdetails" mb={12}>{props.contact.priority}</Typography>
              <Typography variant="h5" color="text.headerdetail" mb={3}>Problema</Typography>
              <Typography variant="subtitle2" color="text.textdetails" mb={12}>{props.contact.problemDescription}</Typography>
              <Typography variant="h5" color="text.headerdetail" mb={3}>Promoción</Typography>
              <Typography variant="subtitle2" color="text.textdetails" mb={12}>{props.contact.promoDescription}</Typography>
              <Typography variant="h5" color="text.headerdetail" mb={3}>CURP</Typography>
              <Typography variant="subtitle2" color="text.textdetails" mb={12}>{props.contact.CURP}</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Grid>
  );
}

export default Contact;