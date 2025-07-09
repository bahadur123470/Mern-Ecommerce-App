// src/pages/admin/AdminProducts.jsx

import React, { Fragment, useState } from 'react';
import ProductImageUpload from '@/components/admin-view/imageUpload';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import { Plus, X } from 'lucide-react';

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
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">Manage your product inventory</p>
          </div>
          <Button 
            onClick={() => setOpenCreateProductsDialog(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New Product
          </Button>
        </div>
      </div>

      {/* Products Grid - Placeholder for now */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Product cards will go here */}
        <div className="text-center text-muted-foreground py-12 col-span-full">
          No products found. Click "Add New Product" to get started.
        </div>
      </div>

      <Sheet open={openCreateProductsDialog} onOpenChange={setOpenCreateProductsDialog}>
        <SheetContent side="right" className="overflow-auto w-full sm:max-w-md">
          <div className="flex justify-between items-center mb-6">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <Button variant="ghost" size="icon" onClick={handleCloseSheet}>
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="space-y-6">
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
            />

            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add Product"
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
