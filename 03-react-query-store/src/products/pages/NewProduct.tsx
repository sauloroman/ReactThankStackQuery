import { Button, Image, Input, Textarea } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useProductMutation } from '..';

interface FormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const NewProduct = () => {

  const { mutation: productMutation } = useProductMutation()

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: 'Teclado',
      price: 150.22,
      description: 'Lorem cillum quis pariatur laborum sit in irure ex ullamco elit. Amet minim laboris aute aute ea elit velit cillum nostrud quis. Eu dolor irure magna deserunt do ea ut velit cillum enim sit officia occaecat cillum. Labore adipisicing anim non do sunt excepteur deserunt ullamco excepteur fugiat fugiat pariatur amet. Do deserunt voluptate id sint. Qui enim dolor Lorem veniam anim sint Lorem veniam culpa anim eiusmod cillum.',
      category: "men's clothing",
      image: 'https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g515-lightspeed-tkl/gallery/g515-keyboard-black-gallery-1-us.png?v=1'
    }
  })

  const newImage = watch('image')

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    productMutation.mutate( data )
  }

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex justify-around items-center">
          <div className="flex-col w-[500px]">

            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  type="text"
                  label="Titulo del producto"
                />
              )}
            />

            <Controller 
              control={ control }
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <Input 
                  value={ field.value?.toString() }
                  onChange={ e => field.onChange( Number( e.target.value ) ) }
                  className="mt-2" 
                  type="number" 
                  label="Precio del producto" 
                />
              )}
            />

            <Controller 
              control={ control }
              name="image"
              rules={{ required: true }}
              render={({ field }) => (
                <Input 
                  value={ field.value }
                  onChange={ field.onChange }
                  className="mt-2" 
                  type="url" 
                  label="Url del producto" 
                />
              )}
            />

            <Controller 
              control={ control }
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea value={ field.value } onChange={ field.onChange } className="mt-2" label="Descripcion del producto" />
              )}
            />

            <Controller 
              control={ control }
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <select value={ field.value } onChange={ field.onChange } className="rounded-md p-3 mt-2 bg-gray-800 w-full">
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <br />
            <Button 
              type="submit" 
              className="mt-2" 
              color="primary"
              isDisabled={productMutation.isPending}
            >
              { productMutation.isPending ? 'Cargando' : 'Crear producto'}
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center"
            style={{
              width: '500px',
              height: '600px',
            }}
          >
            <Image src={ newImage } />
          </div>
        </div>
      </form>
    </div>
  );
};
