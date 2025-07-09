import React, { Fragment, useEffect, useState } from 'react';
import ProductImageUpload from '@/components/admin-view/imageUpload';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, fetchAllProducts } from '@/store/admin/product-slice';
import { toast } from 'sonner';
import AdminProductTile from '@/components/admin-view/product-tile';

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
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector(state => state.adminProducts);
  const dispatch = useDispatch(); // ✅ FIX: add parentheses to useDispatch()

  // ✅ HANDLE FORM SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      image: uploadedImageUrl,
    };

    const response = await dispatch(addNewProduct(payload));

    if (response?.payload?.success) {
      toast.success('Product added successfully');
      dispatch(fetchAllProducts());
      setOpenCreateProductsDialog(false);
      setFormData(initialFormData);
      setImageFile(null);
      setUploadedImageUrl('');
    } else {
      toast.error('Failed to add product');
    }
  };

  // ✅ FETCH PRODUCTS INITIALLY
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // ✅ HANDLE DRAWER CLOSE
  const handleCloseSheet = () => {
    setOpenCreateProductsDialog(false);
    setFormData(initialFormData);
    setImageFile(null);
    setUploadedImageUrl('');
    setCurrentEditedId(null);
  };

  return (
    <Fragment>
      <div className="w-full">
        <div className="m-5 flex justify-end">
          <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList?.length > 0 &&
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id}
              product={productItem}
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
            />
          ))}
      </div>

      <Sheet open={openCreateProductsDialog} onOpenChange={setOpenCreateProductsDialog}>
        <SheetContent side="right" className="overflow-auto sm:w-[500px] w-full">
          <div className="flex justify-between items-center">
            <SheetHeader>
              <SheetTitle>{currentEditedId ? 'Edit Product' : 'Add New Product'}</SheetTitle>
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
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            currentEditedId={currentEditedId}
          />

          <div className="py-6">
            <CommonForm
              onSubmit={handleSubmit}
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
