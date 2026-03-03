namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupervisorRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Set to true. You can add role-based authorization here later.
        return true; 
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'phone_number' => 'required|integer',
            'national_id' => 'required|integer|unique:supervisor,national_id',
            'gender' => 'required|string|max:10',
            'age' => 'required|integer|min:18',
            'license_id' => 'required|integer',
            'years_of_experience' => 'required|integer|min:0',
            'group_ID' => 'required|integer|exists:group_name,id',
        ];
    }
}