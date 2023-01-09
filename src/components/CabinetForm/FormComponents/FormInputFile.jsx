export default function FormInputFile({ className, register }) {
  return (
    <input
      className={className}
      type="file"
      accept="image/png, image/jpeg"
      {...register('avatar')}
    />
  );
}
