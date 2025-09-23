// Context
import { DataProvider } from './context/DataContext.tsx';
import { FormProvider } from './context/formContext.tsx';

// React
import { useState } from 'react';

// Componentes
import Header from './components/header.tsx';
import Filter from './components/filter.tsx';
import { Menu, CategoryResponsive } from './components/menu.tsx';
import ContainerCards from './components/Card/containerCards.tsx';
import DetailCard from './components/detailsCard.tsx';
import FormProduct from './components/formProduct.tsx';

// Packages
import { AnimatePresence } from 'motion/react';

interface imagesTypes {
  image: string;
  name: string;
}

interface dataDetailProps {
  status: boolean;
  images: imagesTypes[];
}

interface filterProps {
  inputValue: string;
  category: string;
}

function App() {
  const dataDetail = {
    status: false,
    images: [{
      image: '',
      name: ''
    }]
  };

  const [detail, setDetail] = useState<dataDetailProps>(dataDetail);
  const [filter, setFilter] = useState<filterProps>(
    {
      inputValue: '',
      category: 'all'
    }
  );
  const [activeButtonMenu, setActiveButtonMenu] = useState('all');

  return (
    <DataProvider>
      <FormProvider>
        {/* Header */}
        <div className='p-7 w-full h-auto text-white bg-[#CC8D68]'>
          <Header></Header>
          <Filter setFilter={setFilter}></Filter>
        </div>

        {/* Body */}
        <div className='w-full h-auto max-w-[1280px] m-auto p-7'>
          <CategoryResponsive
            setFilter={setFilter} activeButtonMenu={activeButtonMenu}
            setActiveButtonMenu={setActiveButtonMenu}>
          </CategoryResponsive>

          <ContainerCards setDetail={setDetail} filter={filter}></ContainerCards>
        </div>

        {/* Elements float */}
        <AnimatePresence>
          {detail.status && (<DetailCard images={detail.images} setDetail={setDetail}></DetailCard>)}
        </AnimatePresence>

        <FormProduct></FormProduct>

        {/* Footer (menu) */}
        <Menu setFilter={setFilter} activeButtonMenu={activeButtonMenu}
          setActiveButtonMenu={setActiveButtonMenu}></Menu>
      </FormProvider>
    </DataProvider>
  )
}

export default App
