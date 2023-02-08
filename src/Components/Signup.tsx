export default function Signup() {
  return (
    <div className="w-max">
        <form className="flex flex-col justify-center space-y-4">
            <div className="flex flex-col">
                <label htmlFor="username" className="text-left">Username</label>
                <input type="text" className="rounded" name="username" id="username" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="email" className="text-left">Email</label>
                <input type="email" className="rounded" name="email" id="email" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="password" className="text-left">Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="passwordConfirm" className="text-left">Confirm Password</label>
                <input type="password" name="passwordConfirm" id="passwordConfirm" />
            </div>
            <div className="flex justify-center">
                <button type="submit" className="w-max">Sign Up</button>
            </div>
        </form>
    </div>
  );
}