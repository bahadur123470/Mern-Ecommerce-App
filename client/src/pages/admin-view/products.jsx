// src/pages/admin/AdminProducts.jsx

import React, { Fragment, useState } from 'react';
import ProductImageUpload from '@/components/admin-view/imageUpload';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import { X } from 'lucide-react';

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleCloseSheet = () => {
    setOpenCreateProductsDialog(false);
    setFormData(initialFormData);
    setImageFile(null);
    setUploadedImageUrl('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      image: imageFile,
    };
    console.log('Submitting Product:', payload);
    // TODO: send to backend
    handleCloseSheet();
  };

  return (
    <Fragment>
      <div className="w-full">
        <div className="m-5 flex justify-end">
          <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>

      <Sheet open={openCreateProductsDialog} onOpenChange={setOpenCreateProductsDialog}>
        <SheetContent side="right" className="overflow-auto sm:w-[500px] w-full">
          <div className="flex justify-between items-center">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <Button variant="ghost" size="icon" onClick={handleCloseSheet}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
          />

          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
