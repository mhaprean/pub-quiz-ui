import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledFAQ = styled('div')`
  .title {
    margin-bottom: 20px;
  }

  .MuiAccordion-root {
    margin-top: 20px;
  }
  padding-bottom: 150px;
`;

const FAQ = () => {
  return (
    <StyledFAQ className="FAQ">
      <Typography className="title" variant="h5">
        F.A.Q.
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography> How do I become a Host?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>To become a Host, simply sign up for the Pub Quiz app and confirm your identity via email.</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography> Can I access the app from my phone?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Yes, you can easily access the app from your phone browser.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography> How do I create a quiz?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            As a Host, you can create a quiz by choosing a title, category, difficulty, and adding questions. Simply go to the "Create Quiz"
            section of the app to get started. It is available on your profile options.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography> How do I create a room?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To create a room, choose a room title and pick an existing quiz from your list. The app will automatically generate a four-digit
            password for the room.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography> How do I join a room as a participant?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            As a User, you can join a room by seeing the list of available rooms, pressing JOIN button and entering the room password when
            prompted.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography> Can I change my answer after submitting it?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>No, once you submit an answer, you cannot change your mind.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography> How do I see my score after the quiz ends?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Both Users and Hosts will be able to see the scores of each participant when the quiz ends.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography> Can people outside the pub participate in the quiz?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography> No, the room password is in place to prevent people outside the pub from participating.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography> What happens if the Host starts the quiz before all participants have joined the room?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Participants can continue to join the room even after the quiz has started, but they will not be able to answer questions that
            have already been displayed.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography> How many questions can a quiz have?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            There is no limit to the number of questions a quiz can have. It depends on the quiz length you would like to create. Usualy
            between 5 and 25
          </Typography>
        </AccordionDetails>
      </Accordion>
    </StyledFAQ>
  );
};

export default FAQ;
