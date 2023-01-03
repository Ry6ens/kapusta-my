import Section from 'components/layout/Section/Section';

import ButtonBack from 'components/ui/ButtonBack/ButtonBack';

import CabinetForm from 'components/CabinetForm/CabinetForm';

import KapustaTwoIcon from 'components/icons/KapustaTwo/KapustaTwo';

export default function AccountPage() {
  return (
    <>
      <Section sectionClass="sectionMarg">
        <ButtonBack text="Main page" width="18" height="12" to="/" />
        <CabinetForm />
        <KapustaTwoIcon iconClass="homeBottom" width="183" height="142" />
      </Section>
    </>
  );
}
